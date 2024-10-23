import { ERole } from '../../shared/enums/role.enum';
import {
  IDefaultControllerAdapterParams,
  IDefaultControllerAdapterResponse,
} from './default-controller-adapter.protocol';

export interface IAuthorizationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  account?: {
    id: string;
    role: ERole;
  };
}

export interface IAuthorizationControllerProtocol {
  handle(
    params: IAuthorizationControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse>;
}
