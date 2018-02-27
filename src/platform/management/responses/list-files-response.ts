import {FileDescriptor, IFileDescriptor} from '../metadata/file-descriptor';

export interface IListFilesResponse {
  nextPageToken: string;
  files: IFileDescriptor[];
}

export class ListFilesResponse {
  public nextPageToken: string | null = null;
  public files: FileDescriptor[] = [];

  constructor(data?: IListFilesResponse) {
    if (data) {
      this.deserialize(data);
    }
  }

  /**
   * @param data
   * @private
   */
  deserialize(data: IListFilesResponse) {
    this.nextPageToken = data.nextPageToken;
    this.files = data.files.map(function (file) {
      return new FileDescriptor(file);
    });
  }
}

