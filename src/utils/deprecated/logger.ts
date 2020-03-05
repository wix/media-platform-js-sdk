export interface Logger {
  trace(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  error(message: string): void;
  info(message: string): void;
}

export const dummyLogger: Logger = {
  trace(message: string): void {},
  warn(message: string): void {},
  debug(message: string): void {},
  error(message: string): void {},
  info(message: string): void {},
};
