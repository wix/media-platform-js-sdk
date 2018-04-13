import {ISource, Source} from '../job/source';
import {deprecated} from 'core-decorators';

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
      this.deserialize(data);
    }
  }

  /**
   * @deprecated pass data to constructor instead
   * @param sources
   * @returns {Invocation}
   */
  @deprecated('pass data to constructor instead')
  setSources(sources: Source[]): this {
    this.sources = sources;
    return this;
  }

  /**
   * @param source
   * @returns {Invocation}
   */
  addSource(source: Source): this {
    if (!this.sources) {
      this.sources = [];
    }

    this.sources.push(source);
    return this;
  }

  /**
   * @deprecated pass data to constructor instead
   * @param entryPoints
   * @returns {Invocation}
   */
  @deprecated('pass data to constructor instead')
  setEntryPoints(entryPoints: EntryPoint[]): this {
    this.entryPoints = entryPoints;
    return this;
  }

  /**
   * @param entryPoint
   * @returns {Invocation}
   */
  addEntryPoint(entryPoint: EntryPoint): this {
    if (!this.entryPoints) {
      this.entryPoints = [];
    }

    this.entryPoints.push(entryPoint);
    return this;
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IInvocation) {
    this.sources = [];
    for (const i in data.sources) {
      this.sources[i] = new Source(data.sources[i]);
    }
    this.entryPoints = data.entryPoints;
  }
}
