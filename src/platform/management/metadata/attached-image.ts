export interface IAttachedImage {
  type: string | null;
  mimeType: string | null;
  url: string | null;
}

export class AttachedImage implements IAttachedImage {
  public type: string | null = null;
  public mimeType: string | null = null;
  public url: string | null = null;

  constructor(data: IAttachedImage) {
    this.type = data.type;
    this.mimeType = data.mimeType;
    this.url = data.url;
  }
}
