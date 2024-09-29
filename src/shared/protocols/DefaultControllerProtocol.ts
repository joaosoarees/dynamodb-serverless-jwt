import { IDefaultControllerAdapterParams } from '../interfaces/DefaultControllerParams';

export interface IDefaultControllerAdapterResponse {
  statusCode: number;
  data: Record<string, any> | undefined;
}

export interface IDefaultControllerProtocol {
  handle(
    params: IDefaultControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse>;
}
