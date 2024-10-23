/* eslint-disable indent */
import { z } from 'zod';

import { IDefaultControllerAdapterResponse } from '@/infra/protocols/default-controller-adapter.protocol';

import {
  IAuthorizationControllerAdapterParams,
  IAuthorizationControllerProtocol,
} from '@/infra/protocols/authorization-controller-adapter.protocol';
import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';

const fileExtensionRegex =
  /\.(png|jpe?g|webp|gif|bmp|tiff|svg|mp4|mov|avi|mkv|pdf|docx?|xlsx?|pptx?)$/i;

const schema = z.object({
  folder: z.string().min(1),
  fileName: z
    .string()
    .regex(fileExtensionRegex, { message: 'Extensão do arquivo inválida.' })
    .min(1),
});

export class GetPresignedUrlController
  implements IAuthorizationControllerProtocol
{
  constructor(
    private readonly getPresignedUrlUseCase: GetPresignedUrlUseCase,
  ) {}
  handle = async (
    params: IAuthorizationControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse> => {
    const { folder, fileName } = await schema.parseAsync(params.body);

    const signedUrl = await this.getPresignedUrlUseCase.execute({
      folder,
      fileName,
    });

    return {
      statusCode: 200,
      data: { signedUrl },
    };
  };
}
