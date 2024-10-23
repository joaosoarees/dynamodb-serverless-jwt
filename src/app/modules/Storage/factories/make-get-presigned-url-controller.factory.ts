import { GetPresignedUrlController } from '../controllers/get-presigned-url.controller';
import { makeGetPresignedUrlUseCase } from './make-get-presigned-url-usecase.factory';

export function makeGetPresignedUrlController() {
  const getPresignedUrlUseCase = makeGetPresignedUrlUseCase();
  return new GetPresignedUrlController(getPresignedUrlUseCase);
}
