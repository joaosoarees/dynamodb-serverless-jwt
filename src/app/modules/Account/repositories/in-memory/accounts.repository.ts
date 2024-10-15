import { randomUUID } from 'crypto';

import { Account } from '../../@types/account.type';
import { ICreateAccountDTO } from '../../dtos/create-account.dto';
import { IAccountsRepository } from '../../protocols/accounts-repository.protocol';

export class InMemoryAccountsRepository implements IAccountsRepository {
  public accounts: Account[] = [];

  async findByEmail(email: string): Promise<Account> {
    return this.accounts.find((account) => account.email === email) as Account;
  }

  async create(data: ICreateAccountDTO): Promise<void> {
    const accountId = randomUUID();

    this.accounts.push({
      ...data,
      id: accountId,
      PK: `ACCOUNT#<${accountId}>`,
      SK: `ACCOUNT#<${accountId}>`,
      GSI1PK: 'ACCOUNTS',
      GSI1SK: `ACCOUNTS#<${data.email}>`,
    });
  }
}
