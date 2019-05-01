export interface ILyrics {
  description: string | null;
  language: string | null;
  text: string | null;
}

export class Lyrics implements ILyrics {
  public description: string | null = null;
  public language: string | null = null;
  public text: string | null = null;

  constructor(data: ILyrics) {
    this.description = data.description;
    this.language = data.language;
    this.text = data.text;
  }
}
