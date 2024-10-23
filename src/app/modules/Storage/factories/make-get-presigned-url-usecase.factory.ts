import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';
import { makeS3Repository } from './make-s3-repository.factory';

export function makeGetPresignedUrlUseCase() {
  const s3Repository = makeS3Repository();
  return new GetPresignedUrlUseCase(s3Repository);
}
