import { ERole } from '@/shared/enums/role.enum';

export interface ICreateAccountDTO {
  email: string;
  name: string;
  password: string;
  role: ERole;
  type: string;
}
