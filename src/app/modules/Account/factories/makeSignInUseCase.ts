import { AccountsRepository } from '../repositories/AccountsRepository';
import { SignInUseCase } from '../useCases/SignInUseCase';

export function makeSignInUseCase() {
  const accountsRepository = new AccountsRepository();
  return new SignInUseCase(accountsRepository);
}
