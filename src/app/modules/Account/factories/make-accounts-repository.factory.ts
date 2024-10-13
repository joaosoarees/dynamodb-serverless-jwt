import { AccountsRepository } from '../repositories/accounts.repository';

export function makeAccountsRepository() {
  return new AccountsRepository();
}
