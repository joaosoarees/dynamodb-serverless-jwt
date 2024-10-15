import {
  IDefaultControllerAdapterParams,
  IDefaultControllerAdapterResponse,
} from '@/shared/protocols/default-controller-adapter.protocol';
import { DefaultControllerAdapter } from '../adapters/default-controller.adapter';

export interface IMakeDefaultControllerAdapterParams {
  controller: (
    params: IDefaultControllerAdapterParams,
  ) => Promise<IDefaultControllerAdapterResponse>;
}

export function makeDefaultControllerAdapter({
  controller,
}: IMakeDefaultControllerAdapterParams) {
  return new DefaultControllerAdapter().adapt(controller);
}
