import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import { IDefaultControllerProtocol } from '@/shared/protocols/DefaultControllerProtocol';
import { makeSignInUseCase } from '../factories/makeSignInUseCase';

export class SignInController implements IDefaultControllerProtocol {
  handle(
    params: IDefaultControllerAdapterParams,
  ): Promise<{ email: string; password: string }> {
    const signInUseCase = makeSignInUseCase();

    const { body, headers, query, pathParameters, queryStringParameters } =
      params;

    console.log({
      body,
      headers,
      query,
      pathParameters,
      queryStringParameters,
    });

    const { email, password }: { email: string; password: string } =
      params.body;

    return signInUseCase.execute({ email, password });
  }
}
