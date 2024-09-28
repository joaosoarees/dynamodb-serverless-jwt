import { IDefaultControllerAdapterParams } from '../../../../shared/interfaces/DefaultControllerParams';
import { IApiGatewayProtocol } from '../../../../shared/protocols/ApiGatewayProtocol';
import { makeSignInUseCase } from '../factories/makeSignInUseCase';

export class SignInController implements IApiGatewayProtocol {
  handle(params: IDefaultControllerAdapterParams): Promise<{ email: string, password: string }> {
    const signInUseCase = makeSignInUseCase();

    const { body, headers, query, pathParameters, queryStringParameters } = params;

    console.log({ body, headers, query, pathParameters, queryStringParameters });

    const { email, password }: { email: string, password: string } = params.body;

    return signInUseCase.execute({ email, password });
  }
}
