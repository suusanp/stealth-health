import * as FileSystem from 'expo-file-system';
import CryptoJS from 'react-native-crypto-js';
import { getEncryptionKey, getPersonalInfo } from '../backend/SecureStoreService';
import { getDailyData } from '../backend/DailyDataManagement';
import {
  calculateBMI,
  calculateBMR,
  estimateDistanceWalked,
  calculateTotalDailyCalorieExpense,
  estimateHydrationLevel,
  indicateStressLevel,
  calculateCaloriesBurnedFromSteps,
  healthConditionRiskIndicator
} from './calculatorFunctions'; // Make sure these functions are correctly imported

const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;

export const computeAndStoreMetrics = async (date) => {
  const encryptionKey = await getEncryptionKey();
  const personalInfo = await getPersonalInfo();
  const computationsFile = `daily_computations${date}.json`;
  const computationsPath = dailyDataDirectory + computationsFile;

  try {
    const dailyData = await getDailyData(date);
    if (!dailyData || !personalInfo || !encryptionKey) {
      console.log("Required data is missing for computation.");
      return "Update daily data.";
    }

    // Ensure all necessary personal info is available
    const { height, weight, gender, ageRange, dailySteps, activities } = { ...personalInfo, ...dailyData };
    if (!height || !weight || !gender || !ageRange) {
      console.log("Insufficient personal information for computation.");
      return "Update daily data.";
    }

    // Convert strings to numbers as necessary
    const heightM = parseFloat(height) / 100; // Assuming height is in cm
    const weightKg = parseFloat(weight);
    const age = parseInt(ageRange.split("-")[0], 10); // Using the lower bound of ageRange
    const isMale = gender.toLowerCase() === 'male';

    // Initialize metrics object
    const metricsData = {};

  // BMR Calculation
  metricsData.BMR = calculateBMR(weightKg, height, age, isMale);
    let steps = 0;
        if (dailyData.dailySteps) {
            steps = parseInt(dailyData.dailySteps, 10);
            // Estimation of Distance Walked
            metricsData.distanceWalked = estimateDistanceWalked(steps, height, personalInfo.gender);
        }

        const caloriesFromSteps = calculateCaloriesBurnedFromSteps(steps, weight);
        metricsData.caloriesFromSteps = caloriesFromSteps;

        // Assuming activities are passed as an array of {type, duration} objects
        const totalDailyCalorieExpense = calculateTotalDailyCalorieExpense(metricsData.BMR, dailyData.activities || [], steps, weight);
        metricsData.totalDailyCalorieExpense = totalDailyCalorieExpense;
        
    // BMI Calculation
    metricsData.BMI = calculateBMI(weightKg, heightM);



    // Hydration Level
    if (dailyData.waterIntake && activities) metricsData.hydrationLevel = estimateHydrationLevel(dailyData.waterIntake, weightKg, activities);

    // Stress Level
    if (dailyData.heartRate && dailyData.sleepPatterns) metricsData.stressLevel = indicateStressLevel(dailyData.heartRate, dailyData.sleepPatterns);

    // Health Risk Indicator
    if (dailyData.bloodPressure) metricsData.healthRisk = healthConditionRiskIndicator(metricsData.BMI, dailyData.bloodPressure);

    // Encrypt and save the metrics data
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
            acc[key] = parsedData[key] === null ? "N/a" : parsedData[key];
            return acc;
        }, {});

        return parsedData;
    } catch (error) {
        console.error("Error retrieving computed metrics:", error);
        return { distance: "N/a", bmi: "N/a", bmr: "N/a" }; // Default values in case of an error
    }
};

const computeAvailableFunctionalities = (metrics) => {
  const availableFunctionalities = [];

  if (metrics.dailySteps || metrics.activityTracking) {
    availableFunctionalities.push({
      title: 'Calorie Burn Estimation',
      explanation: 'Calculates calories burned using the MET (Metabolic Equivalent of Task) values for activities and the formula: Calories Burned = MET * Weight (kg) * Duration (hrs). This formula estimates the energy expenditure of various activities.'
    });
  }
  if (metrics.heartRate) {
    availableFunctionalities.push({
      title: 'Heart Rate Zones for Exercise',
      explanation: 'Determines your optimal heart rate zones for exercise using the formula: Target Heart Rate = [(MHR - Resting HR) * Desired Intensity] + Resting HR, where MHR is 220 minus your age. These zones help you exercise at the right intensity.'
    }, {
      title: 'Indicate Stress Level',
      explanation: 'Assesses stress levels based on average resting heart rate and sleep duration. Elevated heart rates combined with insufficient sleep can indicate high stress.'
    });
  }
  if (metrics.bloodPressure) {
    availableFunctionalities.push({
      title: 'Blood Pressure Monitoring',
      explanation: 'Tracks blood pressure readings to monitor cardiovascular health. Specific thresholds help identify the risk of hypertension.'
    }, {
      title: 'Health Condition Risk Indicator',
      explanation: 'Evaluates the risk of hypertension and type 2 diabetes using BMI and blood pressure readings, incorporating medical guidelines to identify risk levels.'
    });
  }
  if (metrics.sleepPatterns) {
    availableFunctionalities.push({
      title: 'Sleep Quality Assessment',
      explanation: 'Analyzes sleep duration and patterns to assess quality, with adequate rest linked to improved health and reduced stress.'
    }, {
      title: 'Estimate Fatigue Level',
      explanation: 'Estimates fatigue based on daily activity and sleep, recognizing the need for a balance between physical activity and rest.'
    });
  }
  if (metrics.waterIntake || metrics.activityTracking) {
    availableFunctionalities.push({
      title: 'Daily Water Intake Recommendation',
      explanation: 'Recommends daily water intake using the formula: Intake = Weight (kg) * 0.033 + (Exercise Hours * 0.5), adjusted for activity intensity.'
    }, {
      title: 'Estimate Hydration Level',
      explanation: 'Assesses hydration by comparing actual intake against recommended levels, taking into account exercise intensity and duration.'
    });
  }

  if (metrics.dailySteps) {
    availableFunctionalities.push({
      title: 'Estimation of Distance Walked',
      explanation: 'Calculates distance walked based on the number of steps and an average stride length, with gender variations considered for accuracy.'
    });
  }

  return availableFunctionalities.map(func => `${func.title}: ${func.explanation}`);
};


  // Export the function for use in other files
  export default computeAvailableFunctionalities;