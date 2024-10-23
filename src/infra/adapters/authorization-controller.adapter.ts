import { IAuthenticationControllerAdapterParams } from '@/infra/protocols/authentication-controller-adapter.protocol';
import { IAuthorizationControllerAdapterParams } from '@/infra/protocols/authorization-controller-adapter.protocol';
import { IDefaultControllerAdapterResponse } from '@/infra/protocols/default-controller-adapter.protocol';
import { ERole } from '@/shared/enums/role.enum';
import { AccessDeniedError } from '@/shared/errors/access-denied.error';

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

      const account = request.metadata.account;

      if (!this.allowedRoles.includes(account.role))
        throw new AccessDeniedError();

      delete request.metadata;

      return controller({
        ...request,
        account,
      });
    };

    return handler;
  }
}
