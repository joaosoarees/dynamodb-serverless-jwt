import { SignUpController } from '../controllers/sign-up.controller';
import { makeSignUpUseCase } from './make-sign-up-usecase.factory';

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();
  return new SignUpController(signUpUseCase);
}
