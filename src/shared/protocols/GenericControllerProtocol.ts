import { IDefaultControllerAdapterParams } from '../interfaces/DefaultControllerParams';
import { IDefaultControllerAdapterResponse } from './DefaultControllerProtocol';

export type GenericAdapterController = (
  params: IDefaultControllerAdapterParams,
) => Promise<IDefaultControllerAdapterResponse>;
