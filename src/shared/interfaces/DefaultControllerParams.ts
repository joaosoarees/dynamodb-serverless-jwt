import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface IDefaultControllerAdapterParams
  extends APIGatewayProxyEventV2 {
  body: any;
  query: Record<string, any>;
  pathParameters: APIGatewayProxyEventV2['pathParameters'];
  authorization?: string;
}
