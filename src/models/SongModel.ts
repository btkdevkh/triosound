export interface ISongModel {
  id?: number;
  title: string;
  songUrl: string;
  coverUrl: string;
  releaseDate?: string;
  createdAt: string;
  genres?: string;
  singer: string;
  imgFilePath?: string;
  songFilePath?: string;
}
