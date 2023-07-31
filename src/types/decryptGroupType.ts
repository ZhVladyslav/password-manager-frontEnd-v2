export interface IDecryptGrout {
  id: string;
  version: string;
  payload: string;
  date: {
    create: number;
    lastEdit: number;
  };
  collectionData: IDecryptGroutRecord[];
}

export interface IDecryptGroutRecord {
  id: string;
  name: string;
  url: string;
  email: string;
  password: string;
  description: string;
}
