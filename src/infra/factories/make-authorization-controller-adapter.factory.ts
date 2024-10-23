import { IAuthorizationControllerAdapterParams } from '@/infra/protocols/authorization-controller-adapter.protocol';
import { IDefaultControllerAdapterResponse } from '@/infra/protocols/default-controller-adapter.protocol';
import { ERole } from '@/shared/enums/role.enum';
import { AuthorizationControllerAdapter } from '../adapters/authorization-controller.adapter';
import { makeAuthenticationControllerAdapter } from './make-authentication-controller-adapter.factory';

interface IMakeAuthorizationControllerAdapterParams {
  controller: (
    params: IAuthorizationControllerAdapterParams,
  ) => Promise<IDefaultControllerAdapterResponse>;
  allowedRoles: ERole[];
}

export function makeAuthorizationControllerAdapter({
  controller,
  allowedRoles,
}: IMakeAuthorizationControllerAdapterParams) {
  return makeAuthenticationControllerAdapter({
    controller: new AuthorizationControllerAdapter(allowedRoles).adapt(
      controller,
    ),
  });
}
