import { IDefaultControllerAdapterParams } from '../interfaces/DefaultControllerParams';

export type GenericAdapterController = (
  params: IDefaultControllerAdapterParams,
) => Promise<Record<string, any>>;
