import { IDefaultControllerAdapterParams } from '@/shared/interfaces/default-controller-adapter-params.interface';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller.protocol';
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