import * as FileSystem from 'expo-file-system';
import CryptoJS from 'react-native-crypto-js';
import { getEncryptionKey } from './SecureStoreService';

const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;

// Ensure the directory exists
FileSystem.makeDirectoryAsync(dailyDataDirectory, { intermediates: true });

export const saveDailyData = async (data, date) => {
    const encryptionKey = await getEncryptionKey();
    // Encrypt the data
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    // Define the file path
    const fileName = `${date}.json`;
    const filePath = dailyDataDirectory + fileName;

    // Save the encrypted data
    try {
        await FileSystem.writeAsStringAsync(filePath, ciphertext);
        console.log("Data saved successfully:", filePath);
    } catch (error) {
        console.error("Error saving daily data:", error);
    }
};

export const getDailyData = async (date) => {
    const encryptionKey = await getEncryptionKey();
    const fileName = `${date}.json`;
    const filePath = dailyDataDirectory + fileName;

    try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (!fileInfo.exists) {
            console.log("File does not exist:", filePath);
            return null;  // File does not exist, return null or appropriate response
        }

        const encryptedData = await FileSystem.readAsStringAsync(filePath);
        console.log("Encrypted Data:", encryptedData); // Log encrypted data

        // Decrypt the data
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        console.log("Decrypted Data:", decryptedData); // Log decrypted data

        // Attempt to parse the decrypted data
        try {
            const parsedData = JSON.parse(decryptedData);
            return parsedData;
        } catch (parseError) {
            console.error("Error parsing decrypted data:", parseError);
            // Handle or log parse error
            return null;
        }
    } catch (error) {
        console.error("Error retrieving daily data:", error);
        return null; // Or handle the error appropriately
    }
};
