import { ERole } from '@/shared/enums/ERole';
import { AccessDeniedError } from '@/shared/errors/AccessDeniedError';
import { IAuthenticationControllerAdapterParams } from '@/shared/interfaces/AuthenticationControllerAdapterParams';
import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/AuthorizationControllerAdapterParams';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/DefaultControllerProtocol';

export class AuthorizationControllerAdapter {
  constructor(private readonly allowedRoles: ERole[]) {}

  adapt(
    controller: (
      params: IAuthorizationControllerAdapterParams,
    ) => Promise<IDefaultControllerAdapterResponse>,
  ) {
    const handler = async (
      request: IAuthenticationControllerAdapterParams,
    ): Promise<IDefaultControllerAdapterResponse> => {
      if (!request?.metadata?.account) throw new AccessDeniedError();

      if (!this.allowedRoles.includes(request.metadata.account.role))
        throw new AccessDeniedError();

      const account = request.metadata.account;
      delete request.metadata;

      return controller({
        ...request,
        account,
      });
    };

    return handler;
  }
}
