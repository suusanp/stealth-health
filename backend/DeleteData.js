import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Function to delete all data and reset
export async function deleteAll() {
    const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;
  
    try {
      await SecureStore.deleteItemAsync('ageRange');
      await SecureStore.deleteItemAsync('gender');
      await SecureStore.deleteItemAsync('height');
      await SecureStore.deleteItemAsync('weight');
      await SecureStore.deleteItemAsync('fitnessGoals');
      await FileSystem.deleteAsync(dailyDataDirectory, { idempotent: true });
      await AsyncStorage.clear(); 
  
      return true;
    } catch (error) {
      console.error("An error occurred during deletion:", error);
      Alert.alert("Deletion Failed. Please try again.");
      return false;
    }
  }