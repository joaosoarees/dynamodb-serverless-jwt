import { ERole } from '../enums/ERole';
import { IDefaultControllerAdapterParams } from './DefaultControllerParams';

export interface IAuthorizationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  account: {
    id: string;
    role: ERole;
  };
}
