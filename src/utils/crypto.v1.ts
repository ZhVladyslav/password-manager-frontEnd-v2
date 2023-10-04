import { aes256 } from './aes256';

interface ICrypt {
  key: string;
  key2?: string;
  key3?: string;
  str: string;
}

class CryptoV1 {
  public encrypt({ str, key }: ICrypt) {
    try {
      return aes256.encrypt({ str, key });
    } catch (error) {
      console.error(error);
    }
  }

  public decrypt({ str, key }: ICrypt) {
    try {
      return aes256.decrypt({ str, key });
    } catch (error) {
      console.error(error);
    }
  }
}

export const cryptoV1 = new CryptoV1();
