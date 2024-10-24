import type { S3Event } from 'aws-lambda';
import { IS3Trigger } from '../protocols/s3-trigger.protocol';
import { IStorageRepository } from '../protocols/storage-repository.protocol';

export class S3Trigger implements IS3Trigger {
  constructor(private readonly storageRepository: IStorageRepository) {}

  fileUpload = async (event: S3Event): Promise<void> => {
    console.log(JSON.stringify(event, null, 2));

    const fileKeys = event.Records.map((record) => record.s3.object.key);

    await this.storageRepository.setUploadedStatusByFileKeys(fileKeys);
  };
}
