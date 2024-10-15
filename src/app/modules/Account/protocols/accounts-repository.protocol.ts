import { Account } from '../@types/account.type';
import { ICreateAccountDTO } from '../dtos/create-account.dto';

export interface IAccountsRepository {
  findByEmail(email: string): Promise<Account>;
  create(data: ICreateAccountDTO): Promise<void>;
}
