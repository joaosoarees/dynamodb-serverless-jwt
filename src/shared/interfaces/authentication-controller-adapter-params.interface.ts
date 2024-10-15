import { ERole } from '../enums/role.enum';
import { IDefaultControllerAdapterParams } from '../protocols/default-controller-adapter.protocol';

export interface IAuthenticationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  metadata?: {
    account?: {
      id: string;
      role: ERole;
    };
  };
}
