import { IAuthenticationControllerAdapterParams } from '@/shared/interfaces/authentication-controller-adapter-params.interface';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller.protocol';
import { AuthenticationControllerAdapter } from '../adapters/authentication-controller.adapter';
import { makeDefaultControllerAdapter } from './make-default-controller-adapter.factory';

interface IMakeAuthenticationControllerAdapterParams {
  controller: (
    params: IAuthenticationControllerAdapterParams,
  ) => Promise<IDefaultControllerAdapterResponse>;
}

export function makeAuthenticationControllerAdapter({
  controller,
}: IMakeAuthenticationControllerAdapterParams) {
  return makeDefaultControllerAdapter({
    controller: new AuthenticationControllerAdapter().adapt(controller),
  });
}
