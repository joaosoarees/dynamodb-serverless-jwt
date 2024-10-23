/* eslint-disable indent */
import { z } from 'zod';

import {
  IAuthenticationControllerAdapterParams,
  IAuthenticationControllerProtocol,
} from '@/shared/protocols/authentication-controller-adapter.protocol';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller-adapter.protocol';

import { GetPresignedUrlUseCase } from '../useCases/get-presigned-url.usecase';

const schema = z.object({
  folder: z.string().min(1),
  fileName: z.string().min(1),
});

export class GetPresignedUrlController
  implements IAuthenticationControllerProtocol
{
  constructor(
    private readonly getPresignedUrlUseCase: GetPresignedUrlUseCase,
  ) {}

  handle = async (
    params: IAuthenticationControllerAdapterParams,
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
