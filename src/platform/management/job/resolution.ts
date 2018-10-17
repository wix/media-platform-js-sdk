export class Resolution {
  public width: number | null = null;
  public height: number | null = null;

  constructor(data) {
    this.width = data.width;
    this.height = data.height;
  }
}
