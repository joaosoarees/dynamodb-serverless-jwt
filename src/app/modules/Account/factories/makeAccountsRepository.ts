import { AccountsRepository } from '../repositories/AccountsRepository';

export function makeAccountsRepository() {
  return new AccountsRepository();
}
