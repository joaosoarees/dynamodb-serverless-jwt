import { env } from '@/config/env';
import { UnauthorizedError } from '@/shared/errors/UnauthorizedError';
import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/AuthorizationControllerParams';
import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/DefaultControllerProtocol';
import { verify } from 'jsonwebtoken';

export class AuthorizationAdapter {
  adapt(
    controller: (
      params: IAuthorizationControllerAdapterParams,
    ) => Promise<IDefaultControllerAdapterResponse>,
  ) {
    const handler = async (
      request: IDefaultControllerAdapterParams,
    ): Promise<IDefaultControllerAdapterResponse> => {
      const { authorization } = request.headers;

      if (!authorization) throw new UnauthorizedError('Missing access token.');

      const [, accessToken] = authorization.split(' ');

      try {
        const payload = verify(accessToken, env.JWT_SECRET);

        return controller({
          ...request,
          accountId: payload.sub as string,
        });
      } catch (error) {
        console.error(error);
        return {
          statusCode: 401,
          data: {
            message: 'Invalid access token.',
          },
        };
      }
    };

    return handler;
  }
}
