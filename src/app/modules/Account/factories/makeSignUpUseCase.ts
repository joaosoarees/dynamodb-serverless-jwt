import { SignUpUseCase } from '../useCases/SignUpUseCase';
import { makeAccountsRepository } from './makeAccountsRepository';

export function makeSignUpUseCase() {
  const SALT = 10;
  const accountsRepository = makeAccountsRepository();
  return new SignUpUseCase(SALT, accountsRepository);
}
