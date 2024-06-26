import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDataCollectionFlags, saveDataCollectionFlags } from '../backend/FileSystemService';

/**
 * Component to manage user preferences of the health metrics and data collection
 * 
 */
const HealthMetrics = () => {
  const [metrics, setMetrics] = useState({
    dailySteps: false,
    heartRate: false,
    bloodPressure: false,
    sleepPatterns: false,
    waterIntake: false,
    activityTracking: false,
  });

  // Get the data collection permission flags
  useEffect(() => {
    const loadFlags = async () => {
      try {
        const flags = await getDataCollectionFlags();
        setMetrics(flags.length > 0 ? flags : metrics);
      } catch (error) {
        Alert.alert("Error", "Failed to load settings. Please restart the app.");
      }
    };

    loadFlags();
  }, []);

  // Data collection descriptions to user 
  const metricExplanations = {
    dailySteps: "Tracks steps to encourage an active lifestyle.",
    heartRate: "Monitors heart rate for cardiovascular health insights.",
    bloodPressure: "Tracks blood pressure to prevent health complications.",
    sleepPatterns: "Helps understand and improve sleep quality.",
    waterIntake: "Ensures hydration throughout the day.",
    activityTracking: "Gives us a better way to assess the users daily needs",
  };

/**
 * Switch to allow user to change their preferences about data collections
 * @param {string} metric The metric parameter for the toggle switch
 */
  const toggleSwitch = async (metric) => {
    const updatedMetrics = { ...metrics, [metric]: !metrics[metric] };
    await saveDataCollectionFlags(updatedMetrics);
    setMetrics(updatedMetrics);
  };

/**
 * Explanation for the parameter health metric upon user click
 * @param {string} metric The metric parameter for the toggle switch
 */
  const showExplanation = (metric) => {
    Alert.alert(metric.split(/(?=[A-Z])/).join(" "), metricExplanations[metric]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Metrics</Text>
      {Object.keys(metrics).map((metric) => (
        <View key={metric} style={styles.switchContainer}>
          <Text style={styles.metricText}>{metric.split(/(?=[A-Z])/).join(" ")}</Text>
          <View style={styles.iconAndSwitch}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="#6E87C4"
              onPress={() => showExplanation(metric)}
              style={styles.icon}
            />
            <Switch
              trackColor={{ false: "#767577", true: "#6E87C4" }}
              thumbColor={metrics[metric] ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch(metric)}
              value={metrics[metric]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 80,
    marginTop: 160,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  metricText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  iconAndSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default HealthMetrics;
