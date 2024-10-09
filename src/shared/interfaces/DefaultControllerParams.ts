import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface IDefaultControllerAdapterParams {
  body: any;
  query: Record<string, any>;
  pathParameters: APIGatewayProxyEventV2['pathParameters'];
  headers: APIGatewayProxyEventV2['headers'];
}
