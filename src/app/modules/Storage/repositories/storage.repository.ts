import { PutObjectCommand, type S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { s3Client } from '@/clients/s3Client';

import { env } from '@/config/env';
import { IStorageRepository } from '../protocols/storage-repository.protocol';

export class StorageRepository implements IStorageRepository {
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
      expiresIn: 60,
    });

    return signedUrl;
  }
}
