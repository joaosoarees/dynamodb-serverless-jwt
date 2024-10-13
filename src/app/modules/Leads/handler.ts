import { makeAuthenticationControllerAdapter } from '@/infra/factories/make-authentication-controller-adapter.factory';
import { makeAuthorizationControllerAdapter } from '@/infra/factories/make-authorization-controller-adapter.factory';
import { ERole } from '@/shared/enums/role.enum';
import { makeListLeadsController } from './factories/make-list-leads-controller.factory';
import { makePrivateLeadsController } from './factories/make-private-leads-controller.factory';

export const listLeadsHandler = makeAuthenticationControllerAdapter({
  controller: makeListLeadsController().handle,
});

export const privateLeadsHandler = makeAuthorizationControllerAdapter({
  controller: makePrivateLeadsController().handle,
  allowedRoles: [ERole.ADMIN],
});
