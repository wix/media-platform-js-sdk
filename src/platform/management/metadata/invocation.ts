import { ISource, Source } from '../job/source';
import { ICallback, Callback } from '../job/callback';

export enum ErrorStrategy {
  STOP_ON_ERROR = 'stopOnError',
  CONTINUE_ON_ERROR = 'continueOnError',
}

export type EntryPoint = any;

export interface IInvocation {
  sources: ISource[];
  entryPoints: EntryPoint[];
  callback?: ICallback;
  errorStrategy?: ErrorStrategy;
}

export class Invocation implements IInvocation {
  public sources: Source[] = [];
  public entryPoints: EntryPoint[] = [];
  public callback?: ICallback;
  public errorStrategy?: ErrorStrategy = ErrorStrategy.STOP_ON_ERROR;

  constructor(data?: IInvocation) {
    if (data) {
      this.sources = [];

      // tslint:disable-next-line
      for (const i in data.sources) {
        this.sources[i] = new Source(data.sources[i]);
      }

      if (data.callback) {
        this.callback = new Callback(data.callback);
      }

      this.entryPoints = data.entryPoints;

      this.errorStrategy = data.errorStrategy;
    }
  }
}
