import CryptoJS from 'crypto-js';

// ----------------------------------------------------------------------

export const encrypt = (str: string, key: string) => {
  return CryptoJS.AES.encrypt(str, key).toString();
};

// ----------------------------------------------------------------------

export const decrypt = (str: string, key: string) => {
  CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
};
