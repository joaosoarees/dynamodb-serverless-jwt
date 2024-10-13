import { IDefaultControllerAdapterParams } from '../interfaces/default-controller-adapter-params.interface';

export interface IDefaultControllerAdapterResponse {
  statusCode: number;
  data: Record<string, any> | undefined;
}

export interface IDefaultControllerProtocol {
  handle(
    params: IDefaultControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse>;
}
