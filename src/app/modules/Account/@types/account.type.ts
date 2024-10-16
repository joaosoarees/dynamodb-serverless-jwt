import { ERole } from '@/shared/enums/role.enum';

export type Account = {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: ERole;
  type: string;
};
