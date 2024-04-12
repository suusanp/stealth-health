import * as FileSystem from 'expo-file-system'; // for file system operations
import CryptoJS from 'react-native-crypto-js'; // for encryption and decryption
import { getEncryptionKey } from './SecureStoreService'; 

// directory the daily data files will be stored
const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;
FileSystem.makeDirectoryAsync(dailyDataDirectory, { intermediates: true });

/**
 * Function to save daily health data in an encrypted file
 * 
 * @param {Object} data The daily data to be saved, as an object
 * @param {String} date The date, used as the name of the file the data will be saved in
 * 
 * Ecnrypts the provided data using CryptoJS AES ecnryption, 
 * saves it in a file named by the date parameter.
 * 
 */

export const saveDailyData = async (data, date) => {
    // Ensure the directory exists
    FileSystem.makeDirectoryAsync(dailyDataDirectory, { intermediates: true });
    //Get the enryption key from the secure store
    const encryptionKey = await getEncryptionKey();
    // Encrypt the data using CryptoJS AES
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    // Define the file path
    const fileName = `${date}.json`;
    console.log("Date :", date);
    const filePath = dailyDataDirectory + fileName;

    // Save the encrypted data
    try {
        await FileSystem.writeAsStringAsync(filePath, ciphertext);
        console.log("Data saved successfully:", filePath);
    } catch (error) {
        console.error("Error saving daily data:", error);
    }
};


/**
 * Function to get, decrypt and return the daily health data from a file
 * 
 * @param {String} date 
 * @returns {Object} parsedData, @returns {null} if no file found
 * 
 * Gets and decrypts the health data in the file of the date parameter,
 * returns the decrypted health data object. If the file does not exist, 
 * or in case of any error, returns null. 
 * 
 */
export const getDailyData = async (date) => {
    // Get the enryption key from the secure store
    const encryptionKey = await getEncryptionKey();
    // Define the file path
    const fileName = `${date}.json`;
    const filePath = dailyDataDirectory + fileName;

    // Get the file and decrypt
    try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (!fileInfo.exists) {
            console.log("File does not exist:", filePath);
            return null;  // File does not exist, return null or appropriate response
        }

        const encryptedData = await FileSystem.readAsStringAsync(filePath);
        console.log("Encrypted Data:", encryptedData); // Log encrypted data

        // Decrypt the data using CryptoJS AES
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        console.log("Decrypted Data:",fileName, decryptedData); // Log decrypted data

        // Attempt to parse the decrypted data
        try {
            const parsedData = JSON.parse(decryptedData);
            return parsedData;
        } catch (parseError) {
            // log parse error
            console.error("Error parsing decrypted data:", parseError);
            return null;
        }
    } catch (error) {
        // log error retrieving the daily data from the file
        console.error("Error retrieving daily data:", error);
        return null;
    }
};
