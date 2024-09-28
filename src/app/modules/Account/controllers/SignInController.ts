import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import { IDefaultControllerProtocol } from '@/shared/protocols/DefaultControllerProtocol';
import { makeSignInUseCase } from '../factories/makeSignInUseCase';

export class SignInController implements IDefaultControllerProtocol {
  handle(params: IDefaultControllerAdapterParams) {
    const signInUseCase = makeSignInUseCase();

    const { email, password }: { email: string; password: string } =
      params.body;

    return signInUseCase.execute({ email, password });
  }
}
