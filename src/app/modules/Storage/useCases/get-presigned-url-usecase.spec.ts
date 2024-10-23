import { IS3Repository } from '../protocols/s3-repository.protocol';
import { InMemoryS3Repository } from '../repositories/in-memory/s3.repository';
import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';

let s3Repository: IS3Repository;
let getPresignedUrlUseCaseStub: GetPresignedUrlUseCase;

describe('GetPresignedUrlUseCase', () => {
  beforeEach(() => {
    s3Repository = new InMemoryS3Repository();
    getPresignedUrlUseCaseStub = new GetPresignedUrlUseCase(s3Repository);
  });

  it('should return a signedUrl', async () => {
    const signedUrl = await getPresignedUrlUseCaseStub.execute({
      fileName: 'test.png',
      folder: 'test',
    });

    expect(signedUrl).toBeDefined();
  });
});
