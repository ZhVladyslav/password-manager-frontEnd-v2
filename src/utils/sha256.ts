import CryptoJS from 'crypto-js';

class SHA256 {
  generate(str: string) {
    return CryptoJS.SHA512(str).toString();
  }
}

export const sha256 = new SHA256();
