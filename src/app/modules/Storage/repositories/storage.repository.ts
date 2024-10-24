import { dynamoClient } from '@/clients/dynamoClient';
import { env } from '@/config/env';
import { type DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { EStorageStatus } from '../@types/storage.type';
import { IStorageRepository } from '../protocols/storage-repository.protocol';

export class DynamoStorageRepository implements IStorageRepository {
  private client: DynamoDBClient;

  constructor() {
    this.client = dynamoClient;
  }

  async create(fileKey: string, originalFileName: string): Promise<void> {
    const command = new PutCommand({
      TableName: env.DYNAMO_STORAGE_TABLE,
      Item: {
        PK: fileKey,
        originalFileName,
        status: EStorageStatus.PENDING,
      },
    });

    await this.client.send(command);
  }

  async setUploadedStatusByFileKeys(fileKeys: string[]): Promise<void> {
    const commands = fileKeys.map((fileKey) => {
      return new UpdateCommand({
        TableName: env.DYNAMO_STORAGE_TABLE,
        Key: {
          PK: fileKey,
        },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': EStorageStatus.UPLOADED,
        },
      });
    });

    await Promise.all(commands.map((command) => this.client.send(command)));
  }
}
