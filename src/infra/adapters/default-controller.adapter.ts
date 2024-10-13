import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { ZodError } from 'zod';

import { AccessDeniedError } from '@/shared/errors/access-denied.error';
import { AccountAlreadyExistsError } from '@/shared/errors/account-already-exists.error';
import { InvalidCredentialsError } from '@/shared/errors/invalid-credential.error';
import { UnauthorizedError } from '@/shared/errors/unauthorized.error';
import { IDefaultControllerAdapterParams } from '@/shared/interfaces/default-controller-adapter-params.interface';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller.protocol';
import { httpResponse } from '@/shared/utils/http-response';

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

        return httpResponse(statusCode, data);
      } catch (error) {
        console.error(error);

        if (error instanceof AccountAlreadyExistsError) {
          return httpResponse(409, { ...error });
        }

        if (error instanceof InvalidCredentialsError) {
          return httpResponse(401, { ...error });
        }

        if (error instanceof UnauthorizedError) {
          return httpResponse(401, { ...error });
        }

        if (error instanceof AccessDeniedError) {
          return httpResponse(403, { ...error });
        }

        if (error instanceof ZodError) {
          return httpResponse(400, {
            name: 'ValidationError',
            issues: error.issues,
          });
        }

        return httpResponse(500, { message: 'Internal Server Error' });
      }
    };

    return handler;
  }
}
