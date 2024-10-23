import { IAuthenticationControllerAdapterParams } from '@/infra/protocols/authentication-controller-adapter.protocol';
import { IDefaultControllerAdapterResponse } from '@/infra/protocols/default-controller-adapter.protocol';
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
