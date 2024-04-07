import * as FileSystem from 'expo-file-system';
import CryptoJS from 'react-native-crypto-js';
import { getEncryptionKey, getPersonalInfo } from '../backend/SecureStoreService';
import { getDailyData } from '../backend/DailyDataManagement';
import { calculateBMI, calculateBMR, estimateDistanceWalked } from './calculatorFunctions';

const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;

export const computeAndStoreMetrics = async (date) => {
    const encryptionKey = await getEncryptionKey();
    const personalInfo = await getPersonalInfo(); // Retrieve personal info
    const computationsFile = `daily_computations${date}.json`;
    const computationsPath = dailyDataDirectory + computationsFile;

    try {
        const dailyData = await getDailyData(date);
        if (!dailyData) {
            console.log("No daily data available for computation.");
            return;
        }

        // Validate essential personal info
        if (!personalInfo.height || !personalInfo.weight || !personalInfo.gender || !personalInfo.ageRange) {
            console.log("Insufficient personal information for computation.", personalInfo.height, personalInfo.weight, personalInfo.gender, personalInfo.ageRange);
            return;
        }

        const height = parseFloat(personalInfo.height);
        const weight = parseFloat(personalInfo.weight);
        // Approximate age using the lower bound of AgeRange, assuming format "XX-XX"
        const age = parseInt(personalInfo.ageRange.split("-")[0], 10);
        const isMale = personalInfo.gender.toLowerCase() === 'male';

        const dailySteps = parseInt(dailyData.dailySteps || "0", 10); // Safely parse dailySteps
        
        // Perform computations
        const distance = estimateDistanceWalked(dailySteps, height);
        const bmi = calculateBMI(weight, height / 100); // Convert cm to m
        const bmr = calculateBMR(weight, height, age, isMale);

        const metricsData = { distance, bmi, bmr };
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(metricsData), encryptionKey).toString();
        await FileSystem.writeAsStringAsync(computationsPath, ciphertext);
        console.log("Metrics data computed and saved successfully.");
    } catch (error) {
        console.error("Error computing or saving metrics data:", error);
    }
};

export const getComputedMetrics = async (date) => {
    const encryptionKey = await getEncryptionKey();
    const computationsFile = `daily_computations${date}.json`;
    const computationsPath = dailyDataDirectory + computationsFile;

    try {
        const fileInfo = await FileSystem.getInfoAsync(computationsPath);
        if (!fileInfo.exists) {
            console.log("Computed metrics file does not exist:", computationsPath);
            return { distance: -1100, bmi: -1100, bmr: -1100 }; // Default values when file does not exist
        }

        const encryptedData = await FileSystem.readAsStringAsync(computationsPath);
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        let parsedData = JSON.parse(decryptedData);
        console.log("Decrypted Computed Metrics:", parsedData);

        // Replace null values with -1100
        parsedData = Object.keys(parsedData).reduce((acc, key) => {
            acc[key] = parsedData[key] === null ? -1100 : parsedData[key];
            return acc;
        }, {});

        return parsedData;
    } catch (error) {
        console.error("Error retrieving computed metrics:", error);
        return { distance: -1100, bmi: -1100, bmr: -1100 }; // Default values in case of an error
    }
};

const computeAvailableFunctionalities = (metrics) => {
    const availableFunctionalities = []; 
  
    // Check each metric and add corresponding functionalities
    // This is not accurate yet and should be replaced with actual logic. 
  
    if (metrics.dailySteps) {
      availableFunctionalities.push('Calorie Burn Estimation');
    }
    if (metrics.heartRate) {
      availableFunctionalities.push('Heart Rate Zones for Exercise');
    }
    if (metrics.bloodPressure) {
      availableFunctionalities.push('Blood Pressure');
    }
    if (metrics.sleepPatterns) {
      availableFunctionalities.push('Sleep Quality Assessment');
    }
    if (metrics.waterIntake) {
      availableFunctionalities.push('Daily Water Intake Recommendation');
    }
  
    return availableFunctionalities;
  };
  
  // Export the function for use in other files
  export default computeAvailableFunctionalities;