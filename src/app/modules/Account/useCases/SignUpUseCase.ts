import { dynamoClient } from '@/clients/dynamoClient';
import { env } from '@/config/env';
import { AccountAlreadyExists } from '@/shared/errors/AccountAlreadyExists';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';

interface ISignUpUseCaseParams {
  name: string;
  email: string;
  password: string;
}

interface ISignUpUseCaseOutput {
  id: string;
  email: string;
}

export class SignUpUseCase {
  async execute({
    name,
    email,
    password,
  }: ISignUpUseCaseParams): Promise<ISignUpUseCaseOutput> {
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

    const { Items } = await dynamoClient.send(findAccountByEmailCommand);

    if (Items?.length) throw new AccountAlreadyExists();

    const hashedPassword = await hash(password, 10);

    const accountId = randomUUID();

    const createAccountCommand = new PutCommand({
      TableName: env.DYNAMO_ACCOUNTS_TABLE,
      Item: {
        id: accountId,
        name,
        email,
        password: hashedPassword,
        PK: `ACCOUNT#<${accountId}>`,
        SK: `ACCOUNT#<${accountId}>`,
        GSI1PK: 'ACCOUNTS',
        GSI1SK: `ACCOUNTS#<${email}>`,
      },
    });

    await dynamoClient.send(createAccountCommand);

    return {
      id: randomUUID(),
      email,
    };
  }
}
