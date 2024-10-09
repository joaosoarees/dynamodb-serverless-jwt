import { IDefaultControllerAdapterParams } from './DefaultControllerParams';

export interface IAuthorizationControllerAdapterParams
  extends IDefaultControllerAdapterParams {
  accountId: string;
}
