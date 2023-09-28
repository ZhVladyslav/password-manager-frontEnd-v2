export interface IDecryptData extends IDecryptDataMain {
  collectionData: IDecryptDataRecord[];
}

export interface IDecryptDataMain {
  id: string;
  version: string;
  payload: string;
  date: {
    createData: Date;
    lastUpdate: Date;
  };
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
