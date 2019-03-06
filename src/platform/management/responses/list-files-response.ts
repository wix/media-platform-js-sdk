import { FileDescriptor, IFileDescriptor } from '../metadata/file-descriptor';

/**
 * List Files Response interface
 * @doc ListFilesResponse
 */
export interface IListFilesResponse {
  files: IFileDescriptor[];
  nextPageToken?: string;
}

/**
 * List Files Response
 * @doc ListFilesResponse
 */
export class ListFilesResponse {
  public nextPageToken?: string;
  public files: FileDescriptor[] = [];

  constructor(data: IListFilesResponse) {
    this.nextPageToken = data.nextPageToken;

    this.files = data.files.map(file => {
      return new FileDescriptor(file);
    });
  }
}
