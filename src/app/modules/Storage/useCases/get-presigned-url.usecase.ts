import { randomUUID } from 'node:crypto';

import { IS3Repository } from '../protocols/s3-repository.protocol';
import { IStorageRepository } from '../protocols/storage-repository.protocol';
import { extractFileInfo } from '../utils/extractFileInfo';

interface IGetPresignedUrlUseCaseParams {
  folder: string;
  fileName: string;
}

export class GetPresignedUrlUseCase {
  constructor(
    private readonly s3Repository: IS3Repository,
    private readonly storageRepository: IStorageRepository,
  ) {}

  async execute({
    folder,
    fileName,
  }: IGetPresignedUrlUseCaseParams): Promise<string> {
    const { extension, fileName: extractedFileName } =
      extractFileInfo(fileName);
    const fileKey = `${folder}/${randomUUID()}-${extractedFileName}.${extension}`;

    await this.storageRepository.create(fileKey, fileName);
    return this.s3Repository.getPresignedUrl(fileKey);
  }
}
