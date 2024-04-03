import * as FileSystem from 'expo-file-system';
import CryptoJS from 'react-native-crypto-js';
import { getEncryptionKey } from './SecureStoreService';
import { decryptData } from './EncryptionService';

const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;

// Make sure the directory exists
FileSystem.makeDirectoryAsync(dailyDataDirectory, { intermediates: true });

export const saveDailyData = async (data, date) => {
  const encryptionKey = await getEncryptionKey();
  // Convert data to a string and encrypt
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  // Define the file path using the provided date
  const fileName = `${date}.json`; // Format date as 'YYYY-MM-DD'
  const filePath = dailyDataDirectory + fileName;
  // Save the encrypted data as a string
  await FileSystem.writeAsStringAsync(filePath, ciphertext);
};

export const getDailyData = async (date) => {
    const encryptionKey = await getEncryptionKey();
    const fileName = `${date}.json`; // Format date as 'YYYY-MM-DD'
    const filePath = dailyDataDirectory + fileName;

    try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (!fileInfo.exists) {
            // Return null or an empty object to indicate no data for the requested date
            return null;
        }
        const encryptedData = await FileSystem.readAsStringAsync(filePath);
        const decryptedData = decryptData(encryptionKey, encryptedData);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Error retrieving daily data:", error);
        return null; // or handle the error appropriately
    }
};

