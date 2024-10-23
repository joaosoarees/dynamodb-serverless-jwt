export const env = {
  // DynamoDB
  DYNAMO_APPLICATION_TABLE: process.env.DYNAMO_APPLICATION_TABLE!,
  DYNAMO_STORAGE_TABLE: process.env.DYNAMO_STORAGE_TABLE!,

  // S3
  UPLOAD_BUCKET: process.env.UPLOAD_BUCKET!,

  // APP
  JWT_SECRET: process.env.JWT_SECRET!,
};
