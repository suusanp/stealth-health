import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';


// Function to delete all data and reset
export async function deleteAll() {
    const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;
  
    try {
      console.log("\n");
      console.log("---------------------------------------------------------------------------------------");
      console.log("Deleting Data...\n")
      await SecureStore.deleteItemAsync('ageRange');
      console.log('ageRange after deletion:', await SecureStore.getItemAsync('ageRange'));
      await SecureStore.deleteItemAsync('gender');
      console.log('gender after deletion:', await SecureStore.getItemAsync('gender'));
      await SecureStore.deleteItemAsync('height');
      console.log('height after deletion:', await SecureStore.getItemAsync('height'));
      await SecureStore.deleteItemAsync('weight');
      console.log('weight after deletion:', await SecureStore.getItemAsync('weight'));
      await SecureStore.deleteItemAsync('fitnessGoals');
      console.log('fitnessGoals after deletion:', await SecureStore.getItemAsync('fitnessGoals'));
      await SecureStore.deleteItemAsync('dailySteps');
      console.log('dailyStepsGoal after deletion:', await SecureStore.getItemAsync('dailySteps'));
      await SecureStore.deleteItemAsync('dailyDistance');
      console.log('dailyDistanceGoal after deletion:', await SecureStore.getItemAsync('dailyDistance'));
      await SecureStore.deleteItemAsync('dailyCalories');
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