import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';
import { makeStorageRepository } from './make-storage-repository.factory';

export function makeGetPresignedUrlUseCase() {
  const storageRepository = makeStorageRepository();
  return new GetPresignedUrlUseCase(storageRepository);
}
