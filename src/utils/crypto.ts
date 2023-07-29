import CryptoJS from 'crypto-js';
import { v4 } from 'uuid';

// ----------------------------------------------------------------------

export const uuid = () => {
  return v4();
};

// ----------------------------------------------------------------------

export const uuidHash = (): string => {
  const uuidV4: string = v4();
  const hash = sha512(uuidV4);
  return hash;
};

// ----------------------------------------------------------------------

const sha512 = (str: string) => {
  return CryptoJS.SHA512(str).toString();
};

// ----------------------------------------------------------------------

const getPasswords = (key: string): { first: string; second: string } => {
  const hashPass = sha512(key);
  const hashPassAndSalt = sha512(`${key}${hashPass}`);
  const firstPass = sha512(hashPassAndSalt);

  return { first: firstPass, second: hashPassAndSalt };
};

// ----------------------------------------------------------------------

export const encrypt = (str: string, key: string) => {
  const pass = getPasswords(key);

  const finalEncrypt = CryptoJS.AES.encrypt(str, pass.second).toString();
  const firstEncrypt = CryptoJS.AES.encrypt(finalEncrypt, pass.first).toString();

  return firstEncrypt;
};

// ----------------------------------------------------------------------

function decrypt(str: string, key: string): void;
function decrypt(str: string, key: string, res: boolean): string;

function decrypt(str: string, key: string, res?: boolean) {
  const pass = getPasswords(key);

  const firstDecrypt = CryptoJS.AES.decrypt(str, pass.first).toString(CryptoJS.enc.Utf8);
  const finalDecrypt = CryptoJS.AES.decrypt(firstDecrypt, pass.second).toString(CryptoJS.enc.Utf8);

  if (!res) finalDecrypt;
  if (res) return finalDecrypt;
}

export { decrypt };
