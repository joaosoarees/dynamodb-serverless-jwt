import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { ZodError } from 'zod';

import { AccessDeniedError } from '@/shared/errors/AccessDeniedError';
import { AccountAlreadyExistsError } from '@/shared/errors/AccountAlreadyExistsError';
import { InvalidCredentialsError } from '@/shared/errors/InvalidCredentialsError';
import { UnauthorizedError } from '@/shared/errors/UnauthorizedError';
import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/DefaultControllerProtocol';
import { response } from '@/shared/utils/reponse';

export class DefaultControllerAdapter {
  adapt(
    controller: (
      params: IDefaultControllerAdapterParams,
    ) => Promise<IDefaultControllerAdapterResponse>,
  ) {
    const handler = async (
      request: APIGatewayProxyEventV2,
    ): Promise<APIGatewayProxyResultV2> => {
      try {
        const { statusCode, data } = await controller({
          pathParameters: request?.pathParameters || undefined,
          body: request.body && JSON.parse(request.body),
          query:
            request.queryStringParameters &&
            JSON.parse(JSON.stringify(request.queryStringParameters)),
          headers: request.headers,
        });

        return response(statusCode, data);
      } catch (error) {
        console.error(error);

        if (error instanceof AccountAlreadyExistsError) {
          return response(409, { ...error });
        }

        if (error instanceof InvalidCredentialsError) {
          return response(401, { ...error });
        }

        if (error instanceof UnauthorizedError) {
          return response(401, { ...error });
        }

        if (error instanceof AccessDeniedError) {
          return response(403, { ...error });
        }

        if (error instanceof ZodError) {
          return response(400, {
            name: 'ValidationError',
            issues: error.issues,
          });
        }

        return response(500, { message: 'Internal Server Error' });
      }
    };

    return handler;
  }
}
