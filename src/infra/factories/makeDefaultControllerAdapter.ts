import { GenericAdapterController } from '@/shared/protocols/GenericControllerProtocol';
import { DefaultControllerAdapter } from '../adapters/DefaultControllerAdapter';

export function makeDefaultControllerAdapter(
  controller: GenericAdapterController,
) {
  return new DefaultControllerAdapter().adapt(controller);
}
