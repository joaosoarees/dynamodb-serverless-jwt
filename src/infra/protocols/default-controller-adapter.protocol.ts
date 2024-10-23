import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface IDefaultControllerAdapterParams {
  body?: any;
  query?: Record<string, any>;
  pathParameters?: APIGatewayProxyEventV2['pathParameters'];
  headers?: APIGatewayProxyEventV2['headers'];
}

export interface IDefaultControllerAdapterResponse {
  statusCode: number;
  data: Record<string, any> | undefined;
}

export interface IDefaultControllerProtocol {
  handle(
    params: IDefaultControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse>;
}
