import { JwtPayload, verify } from 'jsonwebtoken';

import { env } from '@/config/env';
import { IAuthenticationControllerAdapterParams } from '@/infra/protocols/authentication-controller-adapter.protocol';
import {
  IDefaultControllerAdapterParams,
  IDefaultControllerAdapterResponse,
} from '@/infra/protocols/default-controller-adapter.protocol';
import { ERole } from '@/shared/enums/role.enum';
import { UnauthorizedError } from '@/shared/errors/unauthorized.error';

export class AuthenticationControllerAdapter {
  adapt(
    controller: (
      params: IAuthenticationControllerAdapterParams,
    ) => Promise<IDefaultControllerAdapterResponse>,
  ) {
    const handler = async (
      request: IDefaultControllerAdapterParams,
    ): Promise<IDefaultControllerAdapterResponse> => {
      const { authorization } = request.headers!;

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
      } catch (error) {
        console.error(error);
        throw new UnauthorizedError();
      }
    };

    return handler;
  }
}
