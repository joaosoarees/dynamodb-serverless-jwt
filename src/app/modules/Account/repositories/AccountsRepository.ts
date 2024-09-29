import { dynamoClient } from '@/clients/dynamoClient';
import { env } from '@/config/env';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Account } from '../@types/Account';

export class AccountsRepository {
  async findByEmail(email: string): Promise<Account> {
    const findAccountByEmailCommand = new QueryCommand({
      TableName: env.DYNAMO_ACCOUNTS_TABLE,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :partitionKey AND GSI1SK = :sortKey',
      ExpressionAttributeValues: {
        ':partitionKey': 'ACCOUNTS',
        ':sortKey': `ACCOUNTS#<${email}>`,
      },
      Limit: 1,
    });

    const { Items = [] } = await dynamoClient.send(findAccountByEmailCommand);

    return Items?.[0] as Account;
  }
}
