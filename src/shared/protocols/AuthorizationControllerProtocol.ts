import { IAuthorizationControllerAdapterParams } from '../interfaces/AuthorizationControllerParams';
import { IDefaultControllerAdapterResponse } from './DefaultControllerProtocol';

export type AuthorizationAdapterController = (
  params: IAuthorizationControllerAdapterParams,
) => Promise<IDefaultControllerAdapterResponse>;
