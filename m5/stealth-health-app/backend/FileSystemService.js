import * as FileSystem from 'expo-file-system';
import { subDays } from 'date-fns';

// file URIs to store user preferences
const preferencesFileUri = `${FileSystem.documentDirectory}preferences.json`;
const dataCollectionFlagsUri = `${FileSystem.documentDirectory}dataCollectionFlags.json`;

/**
 * Save user preferences to a file
 * @param {Object} preferences 
 */
export const savePreferences = async (preferences) => {
  const data = JSON.stringify(preferences);
  await FileSystem.writeAsStringAsync(preferencesFileUri, data);
};

/**
 * Get the user preferences from a file
 * If no preference file exists, initialize with default values
 * @returns {Object}
 */
export const getPreferences = async () => {
  const fileInfo = await FileSystem.getInfoAsync(preferencesFileUri);
  if (!fileInfo.exists) {
    console.log("Preferences file doesn't exist, initializing with default values");
    const defaultPreferences = {};
    await savePreferences(defaultPreferences);
    return defaultPreferences;
  }
  const data = await FileSystem.readAsStringAsync(preferencesFileUri);
  return JSON.parse(data);
};

/**
 * Save data collection preferences to a file
 * 
 * @param {Object} flags 
 */
export const saveDataCollectionFlags = async (flags) => {
  const data = JSON.stringify(flags);
  await FileSystem.writeAsStringAsync(dataCollectionFlagsUri, data);
};

/**
 * Get the data collection preferences from the file 
 * If no preference file exists, initialize with default values
 * 
 * @returns {Object}
 */
export const getDataCollectionFlags = async () => {
  const fileInfo = await FileSystem.getInfoAsync(dataCollectionFlagsUri);
  if (!fileInfo.exists) {
    console.log("Data collection flags file doesn't exist, initializing with default values");
    const defaultFlags = {};
    await saveDataCollectionFlags(defaultFlags);
    return defaultFlags;
  }
  const data = await FileSystem.readAsStringAsync(dataCollectionFlagsUri);
  return JSON.parse(data);
};
const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;

/**
 * Returns the data retention period integer based on user data retention preference
 * @param {string} dataRetentionOption 
 * @returns {int}
 */
const getRetentionDays = (dataRetentionOption) => {
  // define data retention period strings to integers 
  const options = {
    '3 Days': 3,
    '1 Week': 7,
    '2 Weeks': 14,
    '1 Month': 30,
    '3 Months': 90,
    '6 Months': 180,
    '1 Year': 365,
  };
  return options[dataRetentionOption] || 30; // Default to 1 Month
};

/**
 * Delete the files older than the data retention period specified by the user
 */
export const checkAndDeleteOldFiles = async () => {
  try {
    const preferences = await getPreferences();

    const retentionDays = getRetentionDays(preferences.dataRetention);

    const today = new Date();
    const cutoffDate = subDays(today, retentionDays);

    const files = await FileSystem.readDirectoryAsync(dailyDataDirectory);
  
    files.forEach(async (fileName) => {
      const fileDateStr = fileName.split('.')[0]; 
      const fileDate = new Date(fileDateStr);

      if (fileDate < cutoffDate) {
        await FileSystem.deleteAsync(`${dailyDataDirectory}${fileName}`);
      }
    });
  } catch (error) {
    console.error("Error during old files check and delete process:", error);
  }
};