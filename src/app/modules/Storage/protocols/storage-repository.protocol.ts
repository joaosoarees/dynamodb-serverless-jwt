export interface IStorageRepository {
  getPresignedUrl(fileKey: string): Promise<string>;
}
