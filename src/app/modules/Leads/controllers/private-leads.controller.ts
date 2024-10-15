import { IAuthorizationControllerAdapterParams } from '@/shared/interfaces/authorization-controller-adapter-params.interface';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller-adapter.protocol';

export class PrivateLeadsController {
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
