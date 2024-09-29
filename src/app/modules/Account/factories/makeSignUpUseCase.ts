import { SignUpUseCase } from '../useCases/SignUpUseCase';

export function makeSignUpUseCase() {
  const SALT = 10;
  return new SignUpUseCase(SALT);
}
