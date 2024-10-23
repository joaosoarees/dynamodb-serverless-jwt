import { randomUUID } from 'node:crypto';

import { IStorageRepository } from '../protocols/storage-repository.protocol';
import { extractFileInfo } from '../utils/extractFileInfo';

interface IGetPresignedUrlUseCaseParams {
  folder: string;
  fileName: string;
}

export class GetPresignedUrlUseCase {
  constructor(private readonly storageRepository: IStorageRepository) {}

  async execute({
    folder,
    fileName,
  }: IGetPresignedUrlUseCaseParams): Promise<string> {
    const { extension } = extractFileInfo(fileName);
    const fileKey = `${folder}/${randomUUID()}.${extension}`;

    return this.storageRepository.getPresignedUrl(fileKey);
  }
}
