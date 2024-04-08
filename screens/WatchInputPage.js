import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView,Alert,TouchableOpacity } from 'react-native';
import { getDailyData, saveDailyData } from '../backend/DailyDataManagement';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Mock activity data
const mockFitbitData = [
  {
    activityName: "Walk",
    duration: "30 mins",
    calories: 120,
    steps: 4000,
  },
  {
    activityName: "Yoga",
    duration: "45 mins",
    calories: 200,
    steps: undefined,
  },
];

const WatchInputPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [fitbitData, setFitbitData] = useState([]);


 
  // Simulate fetching data from Fitbit
  const simulateDataFetch = () => {
    setIsLoading(true);
    setIsBluetoothEnabled(true); // Simulate enabling Bluetooth for syncing
   // Real API Call Simulation (For demonstration purposes only)
    // This is where we would make an actual API call to Fitbit to retrieve user activity data.
    // Example API call to get activity log list:
    // GET https://api.fitbit.com/1/user/-/activities/list.json?afterDate=2022-01-01&sort=asc&offset=0&limit=2
    // Headers:
    // Authorization: Bearer {user_access_token}
    //  would need to replace `{user_access_token}` with the actual access token obtained after authenticating the user with Fitbit.

    console.log("API Calls to Fitbit: Fetching user's activity log list...");

    // Here we  would parse the response and set the fitbitData state with actual data.
  
  
    setTimeout(() => {
      setFitbitData(mockFitbitData);
      setIsLoading(false);
      setIsBluetoothEnabled(false); // Turn off Bluetooth after syncing
    }, 2000);
  };


  const mergeActivitiesWithExistingData = async (fitbitData = []) => {
    // Ensure fitbitData is always treated as an array
    fitbitData = Array.isArray(fitbitData) ? fitbitData : [];
  
    const today = new Date().toISOString().split('T')[0];
    const existingData = await getDailyData(today) || {}; // Fetch existing data, fallback to an empty object if none
  
    // Convert Fitbit data to your app's data structure for activity tracking
    const newActivities = fitbitData.map(activity => ({
      id: Date.now().toString(), // Consider a more unique ID generation strategy
      name: activity.activityName,
      duration: activity.duration ? activity.duration.replace(' mins', '') : '0', // Ensure consistency in data format, fallback to '0' if undefined
    }));
  
    // Merge new activities with existing ones, avoiding duplicates
    const updatedActivities = [...(existingData.activityTracking || []), ...newActivities];
  
    // Return the updated data structure, including any existing data and the newly added activities
    return {
      ...existingData,
      activityTracking: updatedActivities,
    };
  };
  


  const handleSaveData = async () => {
    const today = new Date().toISOString().split('T')[0];
    const existingData = await getDailyData(today) || { activityTracking: [] };
    
    // Merge new activities with existing ones, avoiding duplicates based on a simplistic check here
    const updatedActivities = [...existingData.activityTracking, ...fitbitData.map(activity => ({
      id: Date.now().toString(),
      name: activity.activityName,
      duration: activity.duration.replace(' mins', ''),
    }))];

    const updatedData = {
      ...existingData,
      activityTracking: updatedActivities,
    };

    await saveDailyData(updatedData, today);
    Alert.alert("Success", "Activity data has been saved.");
  };

  const dismissDataPoint = (index) => {
    setFitbitData(currentData => currentData.filter((_, i) => i !== index));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fitbit Activity Sync</Text>
      {isBluetoothEnabled && (
        <Text style={styles.bluetoothText}>Bluetooth enabled for syncing...</Text>
      )}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading your Fitbit data...</Text>
        </View>
      ) : (
        <View style={styles.dataContainer}>
          {fitbitData.length > 0 ? (
            fitbitData.map((activity, index) => (
              <View key={index} style={styles.activityCard}>
                <TouchableOpacity style={styles.dismissButton} onPress={() => dismissDataPoint(index)}>
              <Icon name="close-circle" size={24} color="#f00" />
            </TouchableOpacity>
                <Text style={styles.activityName}>{activity.activityName}</Text>
                <Text>Duration: {activity.duration}</Text>
                <Text>Calories Burned: {activity.calories}</Text>
                {activity.steps && <Text>Steps: {activity.steps}</Text>}
              </View>
            ))
          ) : (
            <Text>No Fitbit data to display. Try syncing!</Text>
          )}
        </View>
      )}
      <Button title="Sync Fitbit Data" onPress={simulateDataFetch} />
      {fitbitData.length > 0 && !isLoading && (
        <Button title="Save Data" onPress={handleSaveData} />
      )}
      <View style={styles.apiCallSection}>
        <Text style={styles.apiCallTitle}>API Calls to Fitbit:</Text>
        <Text>GET /1/user/-/activities/list.json?afterDate=YYYY-MM-DD&sort=asc&offset=0&limit=2</Text>
        <Text>Authorization: Bearer [YourAccessToken]</Text>
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bluetoothText: {
    color: 'blue',
    marginBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  dataContainer: {
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  apiCallSection: {
    marginTop: 20,
  },
  apiCallTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WatchInputPage;
