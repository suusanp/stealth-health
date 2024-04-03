import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDataCollectionFlags, saveDataCollectionFlags } from '../backend/FileSystemService'; // Make sure the path is correct

const HealthMetrics = () => {
  // Initialize with default values directly in the state
  const [metrics, setMetrics] = useState({
    dailySteps: false,
    heartRate: false,
    bloodPressure: false,
    sleepPatterns: false,
    waterIntake: false,
  });

  useEffect(() => {
    const loadFlags = async () => {
      try {
        const flags = await getDataCollectionFlags();
        if (Object.keys(flags).length > 0) { // Check if flags are not an empty object
          setMetrics(flags);
        } else {
          console.log("Using default flags");
        }
      } catch (error) {
        console.error("Failed to load data collection flags:", error);
        Alert.alert("Error", "Failed to load settings. Please restart the app.");
      }
    };

    loadFlags();
  }, []);

  const metricExplanations = {
    dailySteps: "Tracking your steps can help you maintain an active lifestyle.",
    heartRate: "Monitoring heart rate can indicate your cardiovascular health.",
    bloodPressure: "Keeping an eye on blood pressure can prevent health complications.",
    sleepPatterns: "Understanding sleep patterns helps improve your sleep quality.",
    waterIntake: "Recording water intake ensures you stay hydrated throughout the day.",
  };

  const toggleSwitch = async (metric) => {
    try {
      const updatedMetrics = { ...metrics, [metric]: !metrics[metric] };
      await saveDataCollectionFlags(updatedMetrics);
      setMetrics(updatedMetrics);
    } catch (error) {
      console.error("Failed to save data collection flags:", error);
      Alert.alert("Error", "Failed to update settings. Please try again.");
    }
  };

  const showExplanation = (metric) => {
    Alert.alert("Why?", metricExplanations[metric]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Metrics</Text>
      {Object.keys(metrics).map((metric) => (
        <View key={metric} style={styles.switchContainer}>
          <Text style={styles.metricText}>{metric.split(/(?=[A-Z])/).join(" ")}</Text>
          <Icon
            name="question-circle"
            size={20}
            color="grey"
            onPress={() => showExplanation(metric)}
            style={styles.icon}
          />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={metrics[metric] ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(metric)}
            value={metrics[metric]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Align content to the top
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  metricText: {
    fontSize: 16,
    flexGrow: 1, // Allow text to take up as much space as possible
  },
  icon: {
    marginRight: 10, // Add some margin between the icon and the switch
  },
});

export default HealthMetrics;
