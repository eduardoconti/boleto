import { HttpService as Axios } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import { DateVO } from '@domain-core/value-objects';

type Body = Record<string, unknown>;
type Headers = Record<string, string>;
interface PostProps {
  url: string;
  body?: Body;
  headers?: Headers;
  timeOut?: number;
}
export interface IHttpService {
  post<Response>(props: PostProps): Promise<Response>;
}

const DEFAULT_TIMEOUT = 5000;
@Injectable()
export class HttpService implements IHttpService {
  constructor(
    private readonly httpService: Axios,
    private readonly nestLogger: Logger,
  ) {}
  async post<Response>(props: PostProps): Promise<Response> {
    this.nestLogger.log(JSON.stringify(props), 'EXTERNAL API REQUEST');
    const startedAt = DateVO.now().value.getTime();
    try {
      const { data } = await this.httpService.axiosRef.post<Response>(
        props.url,
        props.body,
        {
          headers: props.headers,
          timeout: props.timeOut ?? DEFAULT_TIMEOUT,
        },
      );

      this.nestLogger.log(JSON.stringify(data), 'EXTERNAL API RESPONSE');
      return data;
    } catch (error) {
      this.nestLogger.error(JSON.stringify(error), 'EXTERNAL API ERROR');
      throw error;
    } finally {
      const requestTime = DateVO.now().value.getTime() - startedAt;
      this.nestLogger.log(
        JSON.stringify({ url: props.url, requestTime }),
        'EXTERNAL API REQUEST',
      );
    }
  }
}
