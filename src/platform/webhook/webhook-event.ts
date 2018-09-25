import {FileDescriptor, IFileDescriptor} from '../management/metadata/file-descriptor';


export interface IWebhookEvent {
  id: string;
  type: string;
  body: IFileDescriptor;
}

export class WebhookEvent {
  public id: string | null = null;
  public type: string | null = null;
  public body: FileDescriptor | null = null;

  constructor(data: IWebhookEvent) {
    this.id = data.id;
    this.type = data.type;

    switch (this.type) {
      case 'file_deleted':
      case 'file_created':
        this.body = new FileDescriptor(data.body);
        break;

      case 'metadata_updated':
        break;

      case 'file_transcode_completed':
        break;

      default:
        return;
    }
  }
}
