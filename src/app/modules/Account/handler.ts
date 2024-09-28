import { makeDefaultControllerAdapter } from '../../../infra/factories/makeDefaultControllerAdapter';
import { SignInController } from './controllers/SignInController';

export const signInHandler =
  makeDefaultControllerAdapter(new SignInController().handle);
