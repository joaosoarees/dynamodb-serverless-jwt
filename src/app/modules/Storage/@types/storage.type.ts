export enum EStorageStatus {
  PENDING = 'PENDING',
  UPLOADED = 'UPLOADED',
}

export type Storage = {
  PK: string;
  originalFileName: string;
  status: EStorageStatus;
};
