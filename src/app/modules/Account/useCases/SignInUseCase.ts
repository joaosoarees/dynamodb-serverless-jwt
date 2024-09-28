import { dynamoClient } from '@/clients/dynamoClient';
import { env } from '@/config/env';
import { InvalidCredentials } from '@/shared/errors/InvalidCredentials';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Account } from '../@types/Account';

interface ISignInUseCaseParams {
  email: string;
  password: string;
}

interface ISignInUseCaseOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({
    email,
    password,
  }: ISignInUseCaseParams): Promise<ISignInUseCaseOutput> {
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

    if (!Items?.length) throw new InvalidCredentials();

    const account = Items[0] as Account;

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) throw new InvalidCredentials();

    const accessToken = sign({ sub: account.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { accessToken };
  }
}
