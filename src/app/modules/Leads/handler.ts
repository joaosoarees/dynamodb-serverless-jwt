import { makeAuthorizationAdapter } from '@/infra/factories/makeAuthorizationAdapter';
import { makeListLeadsController } from './factories/makeListLeadsController';

export const listLeadsHandler = makeAuthorizationAdapter(
  makeListLeadsController().handle,
);
