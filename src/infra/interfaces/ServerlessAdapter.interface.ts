import { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface IServerlessAdapterParams extends APIGatewayProxyEventV2 {
  query: APIGatewayProxyEventV2['queryStringParameters'];
}
