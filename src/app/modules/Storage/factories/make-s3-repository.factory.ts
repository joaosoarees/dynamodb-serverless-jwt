import { S3Repository } from '../repositories/s3.repository';

export function makeS3Repository() {
  return new S3Repository();
}
