import { JwtPayload, verify } from 'jsonwebtoken';

import { env } from '@/config/env';
import { ERole } from '@/shared/enums/ERole';
import { UnauthorizedError } from '@/shared/errors/UnauthorizedError';
import { IAuthenticationControllerAdapterParams } from '@/shared/interfaces/AuthenticationControllerAdapterParams';
import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/DefaultControllerProtocol';

export class AuthenticationControllerAdapter {
  adapt(
    controller: (
      params: IAuthenticationControllerAdapterParams,
    ) => Promise<IDefaultControllerAdapterResponse>,
  ) {
    const handler = async (
      request: IDefaultControllerAdapterParams,
    ): Promise<IDefaultControllerAdapterResponse> => {
      const { authorization } = request.headers;

      if (!authorization) throw new UnauthorizedError();

      const [, accessToken] = authorization.split(' ');

      try {
        const payload = verify(accessToken, env.JWT_SECRET) as JwtPayload;

        return controller({
          ...request,
          metadata: {
            account: {
              id: payload.sub as string,
              role: payload.role as ERole,
            },
          },
        });
      } catch {
        throw new UnauthorizedError();
      }
    };

    return handler;
  }
}
