import { dynamoClient } from '@/clients/dynamoClient';
import { env } from '@/config/env';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { IStorageRepository } from '../protocols/storage-repository.protocol';

export class DynamoStorageRepository implements IStorageRepository {
  async create(fileKey: string, originalFileName: string): Promise<void> {
    const command = new PutCommand({
      TableName: env.DYNAMO_STORAGE_TABLE,
      Item: {
        PK: fileKey,
        originalFileName,
      },
    });

    await dynamoClient.send(command);
  }
}
