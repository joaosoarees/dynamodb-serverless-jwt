import { UnauthorizedError } from '@/shared/errors/UnauthorizedError';
import { IDefaultControllerAdapterParams } from '@/shared/interfaces/DefaultControllerParams';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/DefaultControllerProtocol';

export class AuthorizationAdapter {
  adapt(
    controller: (
      params: IDefaultControllerAdapterParams,
    ) => Promise<IDefaultControllerAdapterResponse>,
  ) {
    const handler = async (
      request: IDefaultControllerAdapterParams,
    ): Promise<IDefaultControllerAdapterResponse> => {
      const { authorization } = request;

      if (!authorization) throw new UnauthorizedError();

      return controller({
        ...request,
      });
    };

    return handler;
  }
}
