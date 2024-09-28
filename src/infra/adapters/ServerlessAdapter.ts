import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

export interface IServerlessAdapterParams extends APIGatewayProxyEventV2 {
  query: APIGatewayProxyEventV2['queryStringParameters'],
}

export type ServerlessAdapterController = 
  (params: IServerlessAdapterParams) => Promise<APIGatewayProxyResultV2>;

export class ServerlessAdapter {
  static adapt(controller: ServerlessAdapterController) {
    return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
      return controller({
        ...event,
        query: event.queryStringParameters,
      });
    };
  }
}