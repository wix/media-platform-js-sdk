import {FileDescriptor, IFileDescriptor} from '../metadata/file-descriptor';


/**
 * List Files Response interface
 * @doc ListFilesResponse
 */
export interface IListFilesResponse {
  nextPageToken: string;
  files: IFileDescriptor[];
}

/**
 * List Files Response
 * @doc ListFilesResponse
 */
export class ListFilesResponse {
  public nextPageToken: string | null = null;
  public files: FileDescriptor[] = [];

  constructor(data: IListFilesResponse) {
    this.deserialize(data);
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

