/**
 * Source interface
 * @doc Source
 */

export interface ISource {
  path?: string | null;
  fileId?: string | null;
}

/**
 * Source
 * @doc Source
 */
export class Source implements ISource {
  public path: string | null = null;
  public fileId: string | null = null;

  constructor(data: ISource) {
    if (!data) {
      return;
    }

    if (data.fileId) {
      this.fileId = data.fileId;
    }

    if (data.path) {
      this.path = data.path;
    }
  }
}
