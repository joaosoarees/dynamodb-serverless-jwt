import { GenericAdapterController } from '@/shared/protocols/GenericControllerProtocol';
import { AuthorizationAdapter } from '../adapters/AuthorizationAdapter';
import { makeDefaultControllerAdapter } from './makeDefaultControllerAdapter';

export function makeAuthorizationAdapter(controller: GenericAdapterController) {
  return makeDefaultControllerAdapter(
    new AuthorizationAdapter().adapt(controller),
  );
}
