import { AuthenticationControllerAdapterProtocol } from '@/shared/protocols/AuthenticationControllerAdapterProtocol';
import { AuthenticationControllerAdapter } from '../adapters/AuthenticationControllerAdapter';
import { makeDefaultControllerAdapter } from './makeDefaultControllerAdapter';

export function makeAuthenticationAdapter(
  controller: AuthenticationControllerAdapterProtocol,
) {
  return makeDefaultControllerAdapter(
    new AuthenticationControllerAdapter().adapt(controller),
  );
}
