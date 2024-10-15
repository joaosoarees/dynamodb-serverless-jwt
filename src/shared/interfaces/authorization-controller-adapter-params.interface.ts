import { ERole } from '../enums/role.enum';
import { IDefaultControllerAdapterParams } from '../protocols/default-controller-adapter.protocol';

export interface IAuthorizationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  account: {
    id: string;
    role: ERole;
  };
}
