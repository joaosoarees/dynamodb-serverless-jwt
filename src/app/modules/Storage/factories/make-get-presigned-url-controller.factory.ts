import { GetPresignedUrlController } from '../controllers/get-presigned-url.controller';

export function makeGetPresignedUrlController() {
  return new GetPresignedUrlController();
}
