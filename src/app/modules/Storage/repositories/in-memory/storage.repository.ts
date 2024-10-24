import { Storage } from '../../@types/storage.type';
import { IStorageRepository } from '../../protocols/storage-repository.protocol';

export class InMemoryStorageRepository implements IStorageRepository {
  public storages: Storage[] = [];

  async create(fileKey: string, originalFileName: string): Promise<void> {
    this.storages.push({ PK: fileKey, originalFileName });
  }
}
