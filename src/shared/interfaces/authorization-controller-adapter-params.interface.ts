import { ERole } from '../enums/role.enum';
import { IDefaultControllerAdapterParams } from './default-controller-adapter-params.interface';

export interface IAuthorizationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  account: {
    id: string;
    role: ERole;
  };
}
