import { makeAuthorizationControllerAdapter } from '@/infra/factories/make-authorization-controller-adapter.factory';
import { ERole } from '@/shared/enums/role.enum';
import { makeGetPresignedUrlController } from './factories/make-get-presigned-url-controller.factory';

export const getPresignedUrlHandler = makeAuthorizationControllerAdapter({
  controller: makeGetPresignedUrlController().handle,
  allowedRoles: [ERole.ADMIN],
});
