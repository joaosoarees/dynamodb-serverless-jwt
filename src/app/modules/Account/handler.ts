import { makeDefaultControllerAdapter } from '@/infra/factories/make-default-controller-adapter.factory';

import { makeSignInController } from './factories/make-sign-in-controller.factory';
import { makeSignUpController } from './factories/make-sign-up-controller.factory';

export const signInHandler = makeDefaultControllerAdapter({
  controller: makeSignInController().handle,
});

export const signUpHandler = makeDefaultControllerAdapter({
  controller: makeSignUpController().handle,
});
