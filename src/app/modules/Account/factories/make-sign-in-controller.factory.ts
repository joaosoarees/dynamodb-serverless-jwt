import { SignInController } from '../controllers/sign-in.controller';
import { makeSignInUseCase } from './make-sign-in-usecase.factory';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();
  return new SignInController(signInUseCase);
}
