export interface RawResponse<T> {
  code: number;
  message: string;
  payload: T;
}
