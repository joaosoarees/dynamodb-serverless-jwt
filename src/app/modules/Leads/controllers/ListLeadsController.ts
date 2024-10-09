import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/AuthorizationControllerParams';
import {
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/DefaultControllerProtocol';

export class ListLeadsController implements IDefaultControllerProtocol {
  async handle(
    params: IAuthorizationControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse> {
    const { accountId } = params;

    console.log({ accountId });

    return {
      statusCode: 200,
      data: {
        leads: [
          { id: 1, name: 'Lead 1' },
          { id: 2, name: 'Lead 2' },
          { id: 3, name: 'Lead 3' },
        ],
      },
    };
  }
}
