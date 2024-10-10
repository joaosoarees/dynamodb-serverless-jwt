import { makeAuthenticationAdapter } from '@/infra/factories/makeAuthenticationAdapter';
import { makeAuthorizationAdapter } from '@/infra/factories/makeAuthorizationAdapter';
import { ERole } from '@/shared/enums/ERole';
import { makeListLeadsController } from './factories/makeListLeadsController';
import { makePrivateLeadsController } from './factories/makePrivateLeadsController';

export const listLeadsHandler = makeAuthenticationAdapter(
  makeListLeadsController().handle,
);

export const privateLeadsHandler = makeAuthorizationAdapter({
  controller: makePrivateLeadsController().handle,
  allowedRoles: [ERole.ADMIN],
});
