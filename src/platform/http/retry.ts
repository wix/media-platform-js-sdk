export class RetriableError extends Error {
  constructor(props: string) {
    super(props);
    Object.setPrototypeOf(this, RetriableError.prototype);
  }
}

export async function retry<T>(fn: Function, tries: number): Promise<T> {
  let lastError: any;
  for (let i = 0; i < tries; i++) {
    try {
      const response = await fn();
      return response;
    } catch (e) {
      lastError = e;
      if (!(e instanceof RetriableError)) {
        break;
      }
    }
  }

  throw lastError;
}