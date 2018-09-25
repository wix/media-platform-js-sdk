import {ISource, Source} from '../job/source';


export type EntryPoint = any;

export interface IInvocation {
  sources: ISource[];
  entryPoints: EntryPoint[];
}

export class Invocation implements IInvocation {
  public sources: Source[] = [];
  public entryPoints: EntryPoint[] = [];

  constructor(data?: IInvocation) {
    if (data) {
      this.sources = [];

      for (const i in data.sources) {
        this.sources[i] = new Source(data.sources[i]);
      }

      this.entryPoints = data.entryPoints;
    }
  }
}
