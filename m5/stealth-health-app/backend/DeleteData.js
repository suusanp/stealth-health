import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';


/**
 * Delete all user data, clear SecureStore, FileSystem, and AsyncStorage
 * 
 * @returns {boolean} 
 * Returns true if all the deletions were successful, returns false if any error occured
 */
export async function deleteAll() {
    const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;
  
    try {
      console.log("\n");
      console.log("---------------------------------------------------------------------------------------");
      console.log("Deleting Data...\n")
      await SecureStore.deleteItemAsync('ageRange');
      await SecureStore.deleteItemAsync('gender');
      await SecureStore.deleteItemAsync('height');
      await SecureStore.deleteItemAsync('weight');
      await SecureStore.deleteItemAsync('fitnessGoals');
      await SecureStore.deleteItemAsync('dailySteps');
      await SecureStore.deleteItemAsync('dailyDistance');
      await SecureStore.deleteItemAsync('dailyCalories');

      console.log('ageRange after deletion:', await SecureStore.getItemAsync('ageRange'));
      console.log('gender after deletion:', await SecureStore.getItemAsync('gender'));
      console.log('height after deletion:', await SecureStore.getItemAsync('height'));
      console.log('weight after deletion:', await SecureStore.getItemAsync('weight'));
      console.log('fitnessGoals after deletion:', await SecureStore.getItemAsync('fitnessGoals'));
      console.log('dailyStepsGoal after deletion:', await SecureStore.getItemAsync('dailySteps'));
      console.log('dailyDistanceGoal after deletion:', await SecureStore.getItemAsync('dailyDistance'));
      console.log('dailyCaloriesGoal after deletion:', await SecureStore.getItemAsync('dailyCalories'));

      await FileSystem.deleteAsync(dailyDataDirectory, { idempotent: true });
      console.log('dailyDataDirectory after deletion:', await FileSystem.getInfoAsync(dailyDataDirectory));

      await AsyncStorage.clear(); 
      console.log('AsyncStorage keys after deletion:', await AsyncStorage.getAllKeys());

      console.log("Data deletion done...")
      console.log("---------------------------------------------------------------------------------------");
      console.log("\n");
      
      return true;
    } catch (error) {
      console.error("An error occurred during deletion:", error);
      Alert.alert("Deletion Failed. Please try again.");
      return false;
    }
  }