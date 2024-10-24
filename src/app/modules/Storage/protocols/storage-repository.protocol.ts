export interface IStorageRepository {
  create(fileKey: string, originalFileName: string): Promise<void>;
}
