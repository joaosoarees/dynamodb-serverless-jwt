import { ERole } from '../enums/ERole';
import { IDefaultControllerAdapterParams } from './DefaultControllerParams';

export interface IAuthenticationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  metadata?: {
    account?: {
      id: string;
      role: ERole;
    };
  };
}
