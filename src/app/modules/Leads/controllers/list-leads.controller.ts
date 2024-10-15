import { IAuthenticationControllerAdapterParams } from '@/shared/interfaces/authentication-controller-adapter-params.interface';
import { IDefaultControllerAdapterResponse } from '@/shared/protocols/default-controller-adapter.protocol';

export class ListLeadsController {
  async handle(
    params: IAuthenticationControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse> {
    const { id, role } = params.metadata!.account!;

    console.log({ id, role });

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
