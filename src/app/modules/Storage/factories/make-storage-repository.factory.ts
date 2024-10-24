import { DynamoStorageRepository } from '../repositories/storage.repository';

export function makeStorageRepository() {
  return new DynamoStorageRepository();
}
