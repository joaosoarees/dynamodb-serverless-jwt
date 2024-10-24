import { EStorageStatus, Storage } from '../../@types/storage.type';
import { IStorageRepository } from '../../protocols/storage-repository.protocol';

export class InMemoryStorageRepository implements IStorageRepository {
  public storages: Storage[] = [];

  async create(fileKey: string, originalFileName: string): Promise<void> {
    this.storages.push({
      PK: fileKey,
      originalFileName,
      status: EStorageStatus.PENDING,
      expiresAt: (Date.now() + 60000).toString(),
    });
  }

  async setUploadedStatusByFileKeys(fileKeys: string[]): Promise<void> {
    fileKeys.map((fileKey) => {
      const updateIndex = this.storages.findIndex(
        (storage) => storage.PK === fileKey,
      );

      this.storages[updateIndex].status = EStorageStatus.UPLOADED;
    });
  }
}
