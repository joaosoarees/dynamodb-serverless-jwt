import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import { AccountAlreadyExists } from '../../shared/errors/AccountAlreadyExists';
import { IDefaultControllerAdapterParams } from '../../shared/interfaces/DefaultControllerParams';
import { response } from '../../shared/utils/reponse';

export class DefaultControllerAdapter {
  adapt(controller: (params: IDefaultControllerAdapterParams) => Promise<Record<string, any>>) {
    const handler = async (request: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
      try {
        const result = await controller({
          ...request,
          pathParameters: request?.pathParameters || undefined,
          body: request.body && JSON.parse(request.body),
          query: request?.queryStringParameters &&
            JSON.parse(JSON.stringify(request.queryStringParameters))
        });

        return response(200, result);
      } catch (error) {
        console.error(error);

        if (error instanceof AccountAlreadyExists) {
          return response(409, { ...error });
        }

        return response(500, { message: 'Internal Server Error' });
      }
    };

    return handler;
  }
}
