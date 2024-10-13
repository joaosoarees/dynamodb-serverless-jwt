import { SignInUseCase } from '../useCases/sign-in.usecase';
import { makeAccountsRepository } from './make-accounts-repository.factory';

export function makeSignInUseCase() {
  const accountsRepository = makeAccountsRepository();
  return new SignInUseCase(accountsRepository);
}
