import { makeDefaultControllerAdapter } from '../../../infra/factories/makeDefaultControllerAdapter';
import { SignInController } from './controllers/SignInController';
import { SignUpController } from './controllers/SignUpController';

export const signInHandler = makeDefaultControllerAdapter(
  new SignInController().handle,
);

export const signUpHandler = makeDefaultControllerAdapter(
  new SignUpController().handle,
);
