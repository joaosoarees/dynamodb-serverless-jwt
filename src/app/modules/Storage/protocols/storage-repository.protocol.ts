export interface IStorageRepository {
  create(fileKey: string, originalFileName: string): Promise<void>;
  setUploadedStatusByFileKeys(fileKeys: string[]): Promise<void>;
}
