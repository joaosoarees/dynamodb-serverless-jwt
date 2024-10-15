import { ERole } from '@/shared/enums/role.enum';
import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/authorization-controller-adapter-params.interface';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller-adapter.protocol';
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
