import { ERole } from '@/shared/enums/ERole';
import { AuthorizationControllerAdapterProtocol } from '@/shared/protocols/AuthorizationControllerAdapterProtocol';
import { AuthorizationControllerAdapter } from '../adapters/AuthorizationControllerAdapter';
import { makeAuthenticationAdapter } from './makeAuthenticationAdapter';

interface IMakeAuthorizationAdapterParams {
  controller: AuthorizationControllerAdapterProtocol;
  allowedRoles: ERole[];
}

export function makeAuthorizationAdapter({
  controller,
  allowedRoles,
}: IMakeAuthorizationAdapterParams) {
  return makeAuthenticationAdapter(
    new AuthorizationControllerAdapter(allowedRoles).adapt(controller),
  );
}
