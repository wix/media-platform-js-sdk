export interface IIndexImageSpecification {
  collectionId: string;
}

export class IndexImageSpecification implements IIndexImageSpecification {
  public collectionId: string;

  constructor({ collectionId }: IIndexImageSpecification) {
    this.collectionId = collectionId;
  }
}
