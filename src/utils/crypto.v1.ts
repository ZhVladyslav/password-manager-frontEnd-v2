import { aes256 } from './aes256';

interface ICrypt {
  key: string;
  key2?: string;
  key3?: string;
  str: string;
}

class CryptoV1 {
  public encrypt({ str, key, key2, key3 }: ICrypt) {
    try {
      if (!key2 && key3) return null;

      if (!key2 && !key3) {
        const cryptKey1 = aes256.encrypt({ str, key });
        return cryptKey1;
      }

      if (key2 && !key3) {
        const cryptKey1 = aes256.encrypt({ str, key });
        const cryptKey2 = aes256.encrypt({ str: cryptKey1, key: key2 });
        return cryptKey2;
      }

      if (key2 && key3) {
        const cryptKey1 = aes256.encrypt({ str, key });
        const cryptKey2 = aes256.encrypt({ str: cryptKey1, key: key2 });
        const cryptKey3 = aes256.encrypt({ str: cryptKey2, key: key3 });
        return cryptKey3;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public decrypt({ str, key, key2, key3 }: ICrypt) {
    try {
      if (!key2 && key3) return null;

      if (!key2 && !key3) {
        const cryptKey1 = aes256.decrypt({ str, key });
        return cryptKey1;
      }

      if (key2 && !key3) {
        const cryptKey2 = aes256.decrypt({ str: str, key: key2 });
        const cryptKey1 = aes256.decrypt({ str: cryptKey2, key });
        return cryptKey1;
      }

      if (key2 && key3) {
        const cryptKey3 = aes256.decrypt({ str: str, key: key3 });
        const cryptKey2 = aes256.decrypt({ str: cryptKey3, key: key2 });
        const cryptKey1 = aes256.decrypt({ str: cryptKey2, key });
        return cryptKey1;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const cryptoV1 = new CryptoV1();
