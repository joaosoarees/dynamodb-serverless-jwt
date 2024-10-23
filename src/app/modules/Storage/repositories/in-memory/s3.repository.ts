import { IS3Repository } from '../../protocols/s3-repository.protocol';

export class InMemoryS3Repository implements IS3Repository {
  async getPresignedUrl(fileKey: string): Promise<string> {
    const signedUrl = `https://signed-url.com/${fileKey}`;

    return signedUrl;
  }
}
