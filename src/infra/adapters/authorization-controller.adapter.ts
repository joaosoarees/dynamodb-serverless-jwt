import { ERole } from '@/shared/enums/role.enum';
import { AccessDeniedError } from '@/shared/errors/access-denied.error';
import { IAuthenticationControllerAdapterParams } from '@/shared/interfaces/authentication-controller-adapter-params.interface';
import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/authorization-controller-adapter-params.interface';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller-adapter.protocol';

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
