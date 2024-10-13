import { dynamoClient } from '@/clients/dynamoClient';
import { env } from '@/config/env';
import { ERole } from '@/shared/enums/ERole';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { Account } from '../@types/Account';

interface ICreateAccountParams {
  email: string;
  name: string;
  password: string;
  role: ERole;
  type: string;
}

export class AccountsRepository {
  async findByEmail(email: string): Promise<Account> {
    const command = new QueryCommand({
      TableName: env.DYNAMO_ACCOUNTS_TABLE,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :partitionKey AND GSI1SK = :sortKey',
      ExpressionAttributeValues: {
        ':partitionKey': 'ACCOUNTS',
        ':sortKey': `ACCOUNTS#<${email}>`,
      },
      Limit: 1,
    });

    const { Items = [] } = await dynamoClient.send(command);

    return Items[0] as Account;
  }

  async create({
    name,
    email,
    password,
    role,
    type,
  }: ICreateAccountParams): Promise<void> {
    const accountId = randomUUID();

    const command = new PutCommand({
      TableName: env.DYNAMO_ACCOUNTS_TABLE,
      Item: {
        id: accountId,
        name,
        email,
        password,
        role,
        type,
        PK: `ACCOUNT#<${accountId}>`,
        SK: `ACCOUNT#<${accountId}>`,
        GSI1PK: 'ACCOUNTS',
        GSI1SK: `ACCOUNTS#<${email}>`,
      },
    });

    await dynamoClient.send(command);
  }
}
