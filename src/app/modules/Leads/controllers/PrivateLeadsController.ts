import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/AuthorizationControllerAdapterParams';
import {
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/DefaultControllerProtocol';

export class PrivateLeadsController implements IDefaultControllerProtocol {
  async handle(
    params: IAuthorizationControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse> {
    const { id, role } = params.account;

    console.log({ id, role });

    return {
      statusCode: 200,
      data: {
        leads: [{ id: 1, name: 'Lead 1' }],
      },
    };
  }
}
