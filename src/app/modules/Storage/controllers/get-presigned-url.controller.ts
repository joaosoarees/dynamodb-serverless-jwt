
import {
  IDefaultControllerAdapterParams,
  IDefaultControllerAdapterResponse,
  IDefaultControllerProtocol,
} from '@/shared/protocols/default-controller-adapter.protocol';

export class GetPresignedUrlController implements IDefaultControllerProtocol {
  handle = async (
    params: IDefaultControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse> => {
    return {
      statusCode: 200,
      data: { ok: true },
    };
  };
}
