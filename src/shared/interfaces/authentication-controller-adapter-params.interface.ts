import { ERole } from '../enums/role.enum';
import { IDefaultControllerAdapterParams } from './default-controller-adapter-params.interface';

export interface IAuthenticationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  metadata?: {
    account?: {
      id: string;
      role: ERole;
    };
  };
}
