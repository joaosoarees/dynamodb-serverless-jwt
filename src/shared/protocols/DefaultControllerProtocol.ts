import { IDefaultControllerAdapterParams } from '../interfaces/DefaultControllerParams';

export interface IDefaultControllerProtocol {
  handle(params: IDefaultControllerAdapterParams): Promise<Record<string, any>>;
}
