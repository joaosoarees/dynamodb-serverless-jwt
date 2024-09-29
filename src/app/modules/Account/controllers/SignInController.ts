import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import {
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/DefaultControllerProtocol';
import { z } from 'zod';
import { SignInUseCase } from '../useCases/SignInUseCase';

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
      statusCode: 201,
      data: { accessToken },
    };
  };
}
