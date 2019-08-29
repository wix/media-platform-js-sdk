import { Callback, ICallback } from '../job/callback';
import { FileDescriptor, IFileDescriptor } from './file-descriptor';
import { ISource, Source } from '../job/source';

export interface IFlowComponent {
  type: string;
  specification: any;
  callback?: ICallback;
  results?: IFileDescriptor[];
  sources?: ISource[];
  successors?: string[];
  status?: string | null;
}

export class FlowComponent implements IFlowComponent {
  public type: string;
  public specification: any | null = null;
  public callback?: ICallback;
  public results: FileDescriptor[] = [];
  public sources: Source[] = [];
  public successors: string[] = [];
  public status: string | null = null;

  constructor(data: IFlowComponent) {
    this.type = data.type;
    this.specification = data.specification;

    if (data.successors) {
      this.successors = data.successors;
    }

    if (data.callback) {
      this.callback = new Callback(data.callback);
    }

    if (data.sources) {
      this.sources = data.sources.map(source => new Source(source));
    }

    if (data.results) {
      this.results = data.results.map(
        fileDescriptor => new FileDescriptor(fileDescriptor),
      );
    }

    this.status = data.status ? data.status : null;
  }
}
