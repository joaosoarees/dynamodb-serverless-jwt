import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';
import { makeS3Repository } from './make-s3-repository.factory';
import { makeStorageRepository } from './make-storage-repository.factory';

export function makeGetPresignedUrlUseCase() {
  const s3Repository = makeS3Repository();
  const storageRepository = makeStorageRepository();
  return new GetPresignedUrlUseCase(s3Repository, storageRepository);
}
