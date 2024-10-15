import { z } from 'zod';

import {
  IDefaultControllerAdapterParams,
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/default-controller-adapter.protocol';

import { SignUpUseCase } from '../useCases/sign-up.usecase';

const schema = z.object({
  email: z
    .string()
    .email('E-mail informado é inválido')
    .min(1, 'E-mail é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 dígitos'),
});

export class SignUpController implements IDefaultControllerProtocol {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  handle = async (
    params: IDefaultControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse> => {
    const { email, name, password } = await schema.parseAsync(params.body);

    await this.signUpUseCase.execute({
      email,
      name,
      password,
    });

    return {
      statusCode: 201,
      data: undefined,
    };
  };
}
