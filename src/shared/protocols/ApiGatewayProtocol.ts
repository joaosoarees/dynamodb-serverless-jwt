import { IDefaultControllerAdapterParams } from '../interfaces/DefaultControllerParams';

export interface IApiGatewayProtocol {
  handle(params: IDefaultControllerAdapterParams): Promise<Record<string, any>>;
}
