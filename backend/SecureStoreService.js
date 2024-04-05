import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

export const savePersonalInfo = async (info) => {
  for (const [key, value] of Object.entries(info)) {
    await SecureStore.setItemAsync(key, value.toString());
  }
};

export const getPersonalInfo = async () => {
  const keys = ['ageRange', 'gender', 'height', 'weight', 'fitnessGoals'];
  const info = {};
  for (const key of keys) {
    const value = await SecureStore.getItemAsync(key);
    
    info[key] = value;
  }
  return info;
};

export const generateAndStoreKey = async () => {
  const encryptionKey = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${new Date().toISOString()}${Math.random()}`,
    { encoding: Crypto.CryptoEncoding.HEX }
  );
  await SecureStore.setItemAsync('encryptionKey', encryptionKey);
};

export const getEncryptionKey = async () => {
  return await SecureStore.getItemAsync('encryptionKey');
};
