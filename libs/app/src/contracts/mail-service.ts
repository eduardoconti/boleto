export interface SendMailProps {
  from: string;
  to: string;
  subject: string;
  body: string;
  context: string;
}
export interface IMailService {
  send(data: SendMailProps): Promise<void>;
}
