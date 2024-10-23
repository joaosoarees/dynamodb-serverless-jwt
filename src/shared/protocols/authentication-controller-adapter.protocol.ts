import { ERole } from '../enums/role.enum';
import {
  IDefaultControllerAdapterParams,
  IDefaultControllerAdapterResponse,
} from '../protocols/default-controller-adapter.protocol';

export interface IAuthenticationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  metadata?: {
    account?: {
      id: string;
      role: ERole;
    };
  };
}

export interface IAuthenticationControllerProtocol {
  handle(
    params: IAuthenticationControllerAdapterParams,
  ): Promise<IDefaultControllerAdapterResponse>;
}
