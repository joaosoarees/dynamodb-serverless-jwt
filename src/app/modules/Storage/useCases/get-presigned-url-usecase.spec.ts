import { InMemoryS3Repository } from '../repositories/in-memory/s3.repository';
import { InMemoryStorageRepository } from '../repositories/in-memory/storage.repository';
import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';

let s3Repository: InMemoryS3Repository;
let storageRepository: InMemoryStorageRepository;
let getPresignedUrlUseCaseStub: GetPresignedUrlUseCase;

describe('GetPresignedUrlUseCase', () => {
  beforeEach(() => {
    s3Repository = new InMemoryS3Repository();
    storageRepository = new InMemoryStorageRepository();
    getPresignedUrlUseCaseStub = new GetPresignedUrlUseCase(
      s3Repository,
      storageRepository,
    );
  });

  it('should return a signedUrl', async () => {
    const signedUrl = await getPresignedUrlUseCaseStub.execute({
      fileName: 'test.png',
      folder: 'test',
    });

    expect(signedUrl).toBeDefined();
  });
});
