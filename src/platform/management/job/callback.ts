export interface ICallback {
  url: string;
  attachment: { [key: string]: any };
  headers: { [key: string]: string };
}

export class Callback implements Callback {
  public url: string;
  public attachment: { [key: string]: string };
  public headers: { [key: string]: string };

  constructor(data: ICallback) {
    this.url = data.url;
    this.attachment = data.attachment;
    this.headers = data.headers;
  }
}
