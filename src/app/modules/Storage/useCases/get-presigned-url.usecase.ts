import { randomUUID } from 'node:crypto';

import { IS3Repository } from '../protocols/s3-repository.protocol';
import { extractFileInfo } from '../utils/extractFileInfo';

interface IGetPresignedUrlUseCaseParams {
  folder: string;
  fileName: string;
}

export class GetPresignedUrlUseCase {
  constructor(private readonly s3Repository: IS3Repository) {}

  async execute({
    folder,
    fileName,
  }: IGetPresignedUrlUseCaseParams): Promise<string> {
    const { extension, fileName: originalFileName } = extractFileInfo(fileName);
    const fileKey = `${folder}/${randomUUID()}-${originalFileName}.${extension}`;

    return this.s3Repository.getPresignedUrl(fileKey);
  }
}
