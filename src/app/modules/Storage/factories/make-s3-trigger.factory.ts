import { S3Trigger } from '../triggers/s3.trigger';
import { makeStorageRepository } from './make-storage-repository.factory';

export function makeS3Trigger() {
  const storageRepository = makeStorageRepository();

  return new S3Trigger(storageRepository);
}
