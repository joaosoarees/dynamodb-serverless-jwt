import type { S3Event } from 'aws-lambda';
import { EStorageStatus } from '../@types/storage.type';
import { IS3Trigger } from '../protocols/s3-trigger.protocol';
import { InMemoryS3Repository } from '../repositories/in-memory/s3.repository';
import { InMemoryStorageRepository } from '../repositories/in-memory/storage.repository';
import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';
import { S3Trigger } from './s3.trigger';

let s3Repository: InMemoryS3Repository;
let storageRepository: InMemoryStorageRepository;
let getPresignedUrlUseCaseStub: GetPresignedUrlUseCase;
let s3TriggerStub: IS3Trigger;

describe('S3Trigger', () => {
  beforeEach(() => {
    s3Repository = new InMemoryS3Repository();
    storageRepository = new InMemoryStorageRepository();
    getPresignedUrlUseCaseStub = new GetPresignedUrlUseCase(
      s3Repository,
      storageRepository,
    );
    s3TriggerStub = new S3Trigger(storageRepository);
  });

  it('should set uploaded status in storage item received in s3 event', async () => {
    Array.from([1, 2]).forEach(async (fileNumber) => {
      const fileName = `fileName-${fileNumber}.png`;

      await getPresignedUrlUseCaseStub.execute({
        fileName: fileName,
        folder: 'uploads',
      });
    });

    const fileKeys = storageRepository.storages.map((storage) => storage.PK);

    const mockEvent: S3Event = {
      Records: fileKeys.map((fileKey) => {
        return {
          s3: {
            object: { key: fileKey },
          },
        };
      }),
    } as any;

    await s3TriggerStub.fileUpload(mockEvent);

    expect(storageRepository.storages[0]).toHaveProperty(
      'status',
      EStorageStatus.UPLOADED,
    );
    expect(storageRepository.storages[1]).toHaveProperty(
      'status',
      EStorageStatus.UPLOADED,
    );
  });
});
