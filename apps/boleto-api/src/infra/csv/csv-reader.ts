/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import csv from 'csv-parser';
import * as fs from 'fs';

import type { IReadFile } from '@app/contracts/file-reader';

export class ReadFileCsv<Output> implements IReadFile<Output> {
  private lines: Output[] = [];

  public async read(path: string): Promise<Output[]> {
    try {
      await this.readStream(path);
      return this.lines;
    } catch (error) {
      throw new Error(`Read file Erro`);
    }
  }

  private async readStream(path: string): Promise<void> {
    await new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data: Output) => this.lines.push(data))
        .on('end', () => {
          resolve(this.lines);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
