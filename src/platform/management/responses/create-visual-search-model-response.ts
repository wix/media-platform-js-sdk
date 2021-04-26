export interface ICreateVisualSearchModelResponse {
  id: string;
  name: string;
  description: string;
}

export class CreateVisualSearchModelResponse implements ICreateVisualSearchModelResponse {
  public id: string;
  public name: string;
  public description: string;

  constructor(data: ICreateVisualSearchModelResponse) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
}
