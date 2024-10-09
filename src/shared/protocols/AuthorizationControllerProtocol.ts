import { IDefaultControllerAdapterParams } from '../interfaces/DefaultControllerParams';
import { IDefaultControllerAdapterResponse } from './DefaultControllerProtocol';

export type AuthorizationAdapterController = (
  params: IDefaultControllerAdapterParams,
) => Promise<IDefaultControllerAdapterResponse>;
