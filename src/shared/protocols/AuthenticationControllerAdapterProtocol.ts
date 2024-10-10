import { IAuthenticationControllerAdapterParams } from '../interfaces/AuthenticationControllerAdapterParams';
import { IDefaultControllerAdapterResponse } from './DefaultControllerProtocol';

export type AuthenticationControllerAdapterProtocol = (
  params: IAuthenticationControllerAdapterParams,
) => Promise<IDefaultControllerAdapterResponse>;
