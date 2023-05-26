export const timeoutDelay = (delay: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
