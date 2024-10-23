import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

import { dynamoClient } from '@/clients/dynamoClient';
import { env } from '@/config/env';
import { Account } from '../@types/account.type';

import { ICreateAccountDTO } from '../dtos/create-account.dto';

import { IAccountsRepository } from '../protocols/accounts-repository.protocol';

export class AccountsRepository implements IAccountsRepository {
  async findByEmail(email: string): Promise<Account> {
    const command = new QueryCommand({
      TableName: env.DYNAMO_APPLICATION_TABLE,
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
  }: ICreateAccountDTO): Promise<void> {
    const accountId = randomUUID();

    const command = new PutCommand({
      TableName: env.DYNAMO_APPLICATION_TABLE,
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
