import * as FileSystem from 'expo-file-system';
import { format, subDays } from 'date-fns';

const preferencesFileUri = `${FileSystem.documentDirectory}preferences.json`;
const dataCollectionFlagsUri = `${FileSystem.documentDirectory}dataCollectionFlags.json`;

export const savePreferences = async (preferences) => {
  const data = JSON.stringify(preferences);
  await FileSystem.writeAsStringAsync(preferencesFileUri, data);
};

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

export const saveDataCollectionFlags = async (flags) => {
  const data = JSON.stringify(flags);
  await FileSystem.writeAsStringAsync(dataCollectionFlagsUri, data);
};

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

const getRetentionDays = (dataRetentionOption) => {
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

export const checkAndDeleteOldFiles = async () => {
  try {
    const preferences = await getPreferences();
  //  console.log("Current preferences:", preferences);

    const retentionDays = getRetentionDays(preferences.dataRetention);
   // console.log(`Data retention period in days: ${retentionDays}`);

    const today = new Date();
    const cutoffDate = subDays(today, retentionDays);
  //  console.log(`Cutoff date for data retention: ${cutoffDate.toISOString()}`);

    const files = await FileSystem.readDirectoryAsync(dailyDataDirectory);
  //  console.log(`Found ${files.length} files in the directory.`);

    files.forEach(async (fileName) => {
      const fileDateStr = fileName.split('.')[0]; // Assuming fileName format is 'YYYY-MM-DD.json'
      const fileDate = new Date(fileDateStr);
 //     console.log(`Checking file: ${fileName} with date: ${fileDate.toISOString()}`);

      if (fileDate < cutoffDate) {
        await FileSystem.deleteAsync(`${dailyDataDirectory}${fileName}`);
     //   console.log(`Deleted old file: ${fileName}`);
      }
    });
  } catch (error) {
    console.error("Error during old files check and delete process:", error);
  }
};