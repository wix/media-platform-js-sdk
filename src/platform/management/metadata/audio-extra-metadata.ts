import { AttachedImage, IAttachedImage } from './attached-image';
import { ILyrics, Lyrics } from './lyrics';

export interface IAudioExtraMetadata {
  trackName: string | null;
  artist: string | null;
  albumName: string | null;
  trackNumber: string | null;
  genre: string | null;
  composer: string | null;
  year: string | null;

  images: IAttachedImage[];
  lyrics: ILyrics | null;
}

export class AudioExtraMetadata implements IAudioExtraMetadata {
  public trackName: string | null = null;
  public artist: string | null = null;
  public albumName: string | null = null;
  public trackNumber: string | null = null;
  public genre: string | null = null;
  public composer: string | null = null;
  public year: string | null = null;

  public images: AttachedImage[] = [];
  public lyrics: Lyrics | null = null;

  constructor(data: IAudioExtraMetadata) {
    this.trackName = data.trackName;
    this.artist = data.artist;
    this.albumName = data.albumName;
    this.trackNumber = data.trackNumber;
    this.genre = data.genre;
    this.composer = data.composer;
    this.year = data.year;

    if (data.images) {
      this.images = data.images.map(img => {
        return new AttachedImage(img);
      });
    }

    if (data.lyrics) {
      this.lyrics = new Lyrics(data.lyrics);
    }
  }
}
