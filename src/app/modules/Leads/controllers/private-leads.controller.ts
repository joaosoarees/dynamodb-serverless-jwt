import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/authorization-controller-adapter-params.interface';
import {
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/default-controller.protocol';

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
