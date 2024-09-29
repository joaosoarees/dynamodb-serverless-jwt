import { SignInController } from '../controllers/SignInController';
import { SignInUseCase } from '../useCases/SignInUseCase';

export function makeSignInController() {
  const signInUseCase = new SignInUseCase();
  return new SignInController(signInUseCase);
}
