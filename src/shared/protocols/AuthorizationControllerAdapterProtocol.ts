import { IAuthorizationControllerAdapterParams } from '../interfaces/AuthorizationControllerAdapterParams';
import { IDefaultControllerAdapterResponse } from './DefaultControllerProtocol';

export type AuthorizationControllerAdapterProtocol = (
  params: IAuthorizationControllerAdapterParams,
) => Promise<IDefaultControllerAdapterResponse>;
