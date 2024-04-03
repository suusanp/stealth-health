import * as FileSystem from 'expo-file-system';

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
