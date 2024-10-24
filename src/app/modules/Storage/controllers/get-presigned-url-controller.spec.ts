import { ZodError } from 'zod';
import { IS3Repository } from '../protocols/s3-repository.protocol';
import { IStorageRepository } from '../protocols/storage-repository.protocol';
import { InMemoryS3Repository } from '../repositories/in-memory/s3.repository';
import { InMemoryStorageRepository } from '../repositories/in-memory/storage.repository';
import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';
import { GetPresignedUrlController } from './get-presigned-url.controller';

let s3Repository: IS3Repository;
let storageRepository: IStorageRepository;
let getPresignedUrlUseCaseStub: GetPresignedUrlUseCase;
let getPresignedUrlControllerStub: GetPresignedUrlController;

describe('GetPresignedUrlController', () => {
  beforeEach(() => {
    s3Repository = new InMemoryS3Repository();
    storageRepository = new InMemoryStorageRepository();
    getPresignedUrlUseCaseStub = new GetPresignedUrlUseCase(
      s3Repository,
      storageRepository,
    );
    getPresignedUrlControllerStub = new GetPresignedUrlController(
      getPresignedUrlUseCaseStub,
    );
  });

  it('should throw if no folder is provided', async () => {
    const httpResponse = getPresignedUrlControllerStub.handle({
      body: {
        folder: undefined,
        fileName: 'test.png',
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should throw if no fileName is provided', async () => {
    const httpResponse = getPresignedUrlControllerStub.handle({
      body: {
        folder: 'valid',
        fileName: undefined,
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should throw if invalid folder is provided', async () => {
    const httpResponse = getPresignedUrlControllerStub.handle({
      body: {
        folder: 123,
        fileName: 'test.png',
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should throw if fileName is provided but without extension', async () => {
    const httpResponse = getPresignedUrlControllerStub.handle({
      body: {
        folder: 'valid',
        fileName: 'without-extension',
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should throw if invalid extension fileName is provided', async () => {
    const httpResponse = getPresignedUrlControllerStub.handle({
      body: {
        folder: 'valid',
        fileName: 'without-extension.dnslk',
      },
    });

    await expect(httpResponse).rejects.toBeInstanceOf(ZodError);
  });

  it('should return statusCode 200 and signedUrl if valid data is provided', async () => {
    const httpResponse = await getPresignedUrlControllerStub.handle({
      body: {
        folder: 'valid',
        fileName: 'with-extension.png',
      },
    });

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.data).toHaveProperty('signedUrl');
  });
});
