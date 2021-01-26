import { RetriableError } from "./http-client";

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