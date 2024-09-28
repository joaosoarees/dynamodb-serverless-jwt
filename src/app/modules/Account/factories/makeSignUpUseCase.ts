import { SignUpUseCase } from '../useCases/SignUpUseCase';

export function makeSignUpUseCase() {
  return new SignUpUseCase();
}
