import { AuthorizationAdapterController } from '@/shared/protocols/AuthorizationControllerProtocol';
import { AuthorizationAdapter } from '../adapters/AuthorizationAdapter';
import { makeDefaultControllerAdapter } from './makeDefaultControllerAdapter';

export function makeAuthorizationAdapter(
  controller: AuthorizationAdapterController,
) {
  return makeDefaultControllerAdapter(
    new AuthorizationAdapter().adapt(controller),
  );
}
