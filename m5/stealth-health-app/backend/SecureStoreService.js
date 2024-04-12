import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';


/**
 * Save sensitive encrypted user health data to Expo-Secure-Store 
 * @param {Object} info key-value pairs to be stored
 */
export const savePersonalInfo = async (info) => {
  for (const [key, value] of Object.entries(info)) {
    await SecureStore.setItemAsync(key, value.toString());
  }
};

/**
 * Get the personal info from Expo-Secure-Store 
 * @returns {Object} key-value pairs, the info returned from the Secure Store, personal user info
 */
export const getPersonalInfo = async () => {
  // keys that are expected to be in the Expo-Secure-Store 
  // loop through all the keys and retrieve its value in the Expo-Secure-Store 
  const keys = ['ageRange', 'gender', 'height', 'weight', 'fitnessGoals'];
  const info = {};
  for (const key of keys) {
    const value = await SecureStore.getItemAsync(key);
    
    info[key] = value;
  }
  return info;
};

/**
 * Generate and store encryption key
 * SHA256 algorithm is used
 */
export const generateAndStoreKey = async () => {
  const encryptionKey = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${new Date().toISOString()}${Math.random()}`,
    { encoding: Crypto.CryptoEncoding.HEX }
  );
  await SecureStore.setItemAsync('encryptionKey', encryptionKey);
};

/**
 * Get the stored encryption key
 * @returns {string} 
 */
export const getEncryptionKey = async () => {
  return await SecureStore.getItemAsync('encryptionKey');
};
