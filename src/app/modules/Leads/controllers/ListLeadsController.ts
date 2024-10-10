import { IAuthenticationControllerAdapterParams } from '@/shared/interfaces/AuthenticationControllerAdapterParams';
import {
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/DefaultControllerProtocol';

export class ListLeadsController implements IDefaultControllerProtocol {
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
