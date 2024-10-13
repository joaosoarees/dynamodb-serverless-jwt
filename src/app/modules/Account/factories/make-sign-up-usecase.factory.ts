import { SignUpUseCase } from '../useCases/sign-up.usecase';
import { makeAccountsRepository } from './make-accounts-repository.factory';

export function makeSignUpUseCase() {
  const SALT = 10;
  const accountsRepository = makeAccountsRepository();
  return new SignUpUseCase(SALT, accountsRepository);
}
