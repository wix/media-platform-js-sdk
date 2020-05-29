import { basename } from 'path';
import { lookup } from 'mime-types';


// TODO: file-api stopped working, this is a temporary replacement stub for it
export class File implements Blob {
  public name: string;
  public type: string;
  public size: number = 0;

  constructor(public path: string) {
    this.name = basename(path);
    const type = lookup(this.name);
    if (!type) {
      throw Error('no type');
    }
    this.type = type;
  }

  arrayBuffer(): Promise<any> {
    return Promise.resolve();
  }

  slice(start?: number, end?: number, contentType?: string): any {
    return this;
  }

  stream(): any {}

  text(): Promise<string> {
    return Promise.resolve('file');
  }
}
