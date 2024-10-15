import { z } from 'zod';

import {
  IDefaultControllerAdapterParams,
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/default-controller-adapter.protocol';

import { SignInUseCase } from '../useCases/sign-in.usecase';

const schema = z.object({
  email: z
    .string()
    .email('E-mail informado é inválido')
    .min(1, 'E-mail é obrigatório'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 dígitos'),
});

export class SignInController implements IDefaultControllerProtocol {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  handle = async (
    params: IDefaultControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse> => {
    const { email, password } = await schema.parseAsync(params.body);

    const { accessToken } = await this.signInUseCase.execute({
      email,
      password,
    });

    return {
      statusCode: 200,
      data: { accessToken },
    };
  };
}
