import CryptoJS from 'crypto-js';

interface ICrypt {
  key: string;
  str: string;
}

class AES256 {
  crypt({ str, key }: ICrypt) {
    return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
  }

  encrypt({ str, key }: ICrypt) {
    return CryptoJS.AES.encrypt(str, key).toString();
  }
}

export const aes256 = new AES256();
