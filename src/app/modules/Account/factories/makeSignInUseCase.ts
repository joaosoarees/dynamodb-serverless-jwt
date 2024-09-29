import { SignInUseCase } from '../useCases/SignInUseCase';
import { makeAccountsRepository } from './makeAccountsRepository';

export function makeSignInUseCase() {
  const accountsRepository = makeAccountsRepository();
  return new SignInUseCase(accountsRepository);
}
