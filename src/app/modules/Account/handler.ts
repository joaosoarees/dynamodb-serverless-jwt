import { makeDefaultControllerAdapter } from '@/infra/factories/makeDefaultControllerAdapter';
import { makeSignInController } from './factories/makeSignInController';
import { makeSignUpController } from './factories/makeSignUpController';

export const signInHandler = makeDefaultControllerAdapter(
  makeSignInController().handle,
);

export const signUpHandler = makeDefaultControllerAdapter(
  makeSignUpController().handle,
);
