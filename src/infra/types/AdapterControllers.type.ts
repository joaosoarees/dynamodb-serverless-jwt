import { APIGatewayProxyResultV2 } from 'aws-lambda';

import { IServerlessAdapterParams } from '../interfaces/ServerlessAdapter.interface';

export type ServerlessAdapterController = (
  params: IServerlessAdapterParams,
) => Promise<APIGatewayProxyResultV2>;
