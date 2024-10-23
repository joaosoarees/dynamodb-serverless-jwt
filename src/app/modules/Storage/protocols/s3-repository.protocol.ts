export interface IS3Repository {
  getPresignedUrl(fileKey: string): Promise<string>;
}
