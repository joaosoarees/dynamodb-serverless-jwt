import { GenericAdapterController } from '@/shared/protocols/GenericControllerProtocol';
import { DefaultControllerAdapter } from '../adapters/DefaultControllerAdapter';
import { ServerlessAdapter } from '../adapters/ServerlessAdapter';

export function makeDefaultControllerAdapter(
  controller: GenericAdapterController,
) {
  return ServerlessAdapter.adapt(
    new DefaultControllerAdapter().adapt(controller),
  );
}
