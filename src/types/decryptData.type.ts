export interface IDecryptData {
  id: string;
  version: string;
  payload: string;
  date: {
    createData: number;
    lastUpdate: number;
  };
  collectionData: IDecryptDataRecord[];
}

export interface IDecryptDataRecord {
  id: string;
  name: string;
  url: string;
  email: string;
  password: string;
  description: string;
  [key: string]: string;
}
