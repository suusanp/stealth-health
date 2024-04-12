import CryptoJS from 'react-native-crypto-js';

// functions to encrypt and decrypt the data using the CryptoJS library

/**
 * Encrypts the data using CryptoJS AUS encryption
 * 
 * @param {string} secretKey the secret key used for the encryption 
 * @param {Object} data the data to encrypt
 * @returns {string} the encrypted data, returned as string
 */
export const encryptData = (secretKey, data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
};

/**
 * 
 * @param {string} secretKey the secret key used for the decryption 
 * @param {string} ciphertext the previously encrypted string to be decrypted
 * @returns {Object} the decrypted data
 */
export const decryptData = (secretKey, ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
