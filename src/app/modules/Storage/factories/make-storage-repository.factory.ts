import { StorageRepository } from '../repositories/storage.repository';

export function makeStorageRepository() {
  return new StorageRepository();
}
