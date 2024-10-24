import type { S3Event } from 'aws-lambda';

export interface IS3Trigger {
  fileUpload(event: S3Event): Promise<void>;
}
