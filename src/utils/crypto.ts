import CryptoJS from 'crypto-js';

// ----------------------------------------------------------------------

export const encrypt = (str: string, key: string) => {
  return CryptoJS.AES.encrypt(str, key).toString();
};

// ----------------------------------------------------------------------

function decrypt(str: string, key: string): void;
function decrypt(str: string, key: string, res: boolean): string;
function decrypt(str: string, key: string, res?: boolean) {
  if (!res) CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
  if (res) return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
}

export { decrypt };
