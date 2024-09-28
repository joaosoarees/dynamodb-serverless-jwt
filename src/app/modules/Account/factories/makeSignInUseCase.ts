import { SignInUseCase } from '../useCases/SignInUseCase';

export function makeSignInUseCase() {
  return new SignInUseCase();
}
