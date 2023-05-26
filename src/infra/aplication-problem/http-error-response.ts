import type { Response } from 'express';

import type { AplicationProblem } from './aplication-problem';

export function send(
  res: Response,
  aplicationProblem: AplicationProblem,
): void {
  res.setHeader('content-type', 'aplication/problem+json');
  res.status(aplicationProblem.status).json(aplicationProblem.toJSON());
  return;
}
