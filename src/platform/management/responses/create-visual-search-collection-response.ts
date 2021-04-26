export interface ICreateVisualSearchCollectionResponse {
  id: string;
  name: string;
  projectId: string;
  modelId: string;
}

export class CreateVisualSearchCollectionResponse implements ICreateVisualSearchCollectionResponse {
  public id: string;
  public name: string;
  public projectId: string;
  public modelId: string;

  constructor(data: ICreateVisualSearchCollectionResponse) {
    this.id = data.id;
    this.name = data.name;
    this.projectId = data.projectId;
    this.modelId = data.modelId;
  }
}
