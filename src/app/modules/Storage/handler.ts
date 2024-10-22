import { makeDefaultControllerAdapter } from '@/infra/factories/make-default-controller-adapter.factory';

import { makeGetPresignedUrlController } from './factories/make-get-presigned-url-controller.factory';

export const getPresignedUrlHandler = makeDefaultControllerAdapter({
  controller: makeGetPresignedUrlController().handle,
});
