import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import { IDefaultControllerProtocol } from '@/shared/protocols/DefaultControllerProtocol';
import { makeSignUpUseCase } from '../factories/makeSignUpUseCase';

export class SignUpController implements IDefaultControllerProtocol {
  async handle(
    params: IDefaultControllerAdapterParams,
  ): Promise<{ id: string; email: string }> {
    const signInUseCase = makeSignUpUseCase();

    const {
      email,
      password,
      name,
    }: { email: string; password: string; name: string } = params.body;

    console.log({
      email,
      password,
      name,
    });

    return signInUseCase.execute({
      email,
      name,
      password,
    });
  }
}
