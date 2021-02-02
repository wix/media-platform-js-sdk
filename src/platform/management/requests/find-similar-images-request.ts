export interface IFindSimilarImagesRequest {
  imageUrl: string;
}

/**
 * Find Similar Images Request
 * @doc FindSimilarImagesRequest
 */
export class FindSimilarImagesRequest implements IFindSimilarImagesRequest {
  public imageUrl: string;

  constructor({ imageUrl }: IFindSimilarImagesRequest) {
    this.imageUrl = imageUrl;
  }
}
