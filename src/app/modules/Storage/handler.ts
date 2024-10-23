import { makeAuthenticationControllerAdapter } from '@/infra/factories/make-authentication-controller-adapter.factory';
import { makeGetPresignedUrlController } from './factories/make-get-presigned-url-controller.factory';

export const getPresignedUrlHandler = makeAuthenticationControllerAdapter({
  controller: makeGetPresignedUrlController().handle,
});
