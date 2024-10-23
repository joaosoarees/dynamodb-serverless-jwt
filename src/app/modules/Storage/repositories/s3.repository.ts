import { PutObjectCommand, type S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { s3Client } from '@/clients/s3Client';
import { env } from '@/config/env';

import { IS3Repository } from '../protocols/s3-repository.protocol';

export class S3Repository implements IS3Repository {
  private client: S3Client;

  constructor() {
    this.client = s3Client;
  }

  async getPresignedUrl(fileKey: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: env.UPLOAD_BUCKET,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 20,
    });

    return signedUrl;
  }
}
