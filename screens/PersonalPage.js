import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getPreferences, savePreferences, getDataCollectionFlags, saveDataCollectionFlags } from './FileSystemService';
import BottomNavigationBar from './BottomNavigationBar'; // Ensure this path is correct for your project structure

const DataManagementScreen = ({ navigation }) => {
  const [dataRetention, setDataRetention] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [metrics, setMetrics] = useState({
    dailySteps: false,
    heartRate: false,
    bloodPressure: false,
    sleepPatterns: false,
    waterIntake: false,
  });

  // Data retention options
  const DataRetentionOptions = [
    '3 Days', '1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year',
  ];

  useEffect(() => {
    const loadSettings = async () => {
      const preferences = await getPreferences();
      setDataRetention(preferences.dataRetention || '1 Month');
      setNotificationsEnabled(preferences.notificationsEnabled || false);
      const flags = await getDataCollectionFlags();
      setMetrics(flags);
    };
    loadSettings();
  }, []);

  const toggleSwitch = async (metric) => {
    const updatedMetrics = { ...metrics, [metric]: !metrics[metric] };
    setMetrics(updatedMetrics);
    await saveDataCollectionFlags(updatedMetrics);
  };

  const renderDataRetentionOptions = () => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.carousel}>
      {DataRetentionOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.carouselItem, dataRetention === option && styles.carouselItemSelected]}
          onPress={() => {
            setDataRetention(option);
            savePreferences({ dataRetention: option, notificationsEnabled });
          }}
        >
          <Text style={styles.carouselItemText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
       style={styles.modifyProfileButton}
       onPress={() => navigation.navigate('ProfileManage')}>
       <Text style={styles.modifyProfileButtonText}>Modify Profile</Text>
       </TouchableOpacity>
        <Text style={styles.header}>Privacy and Data Management</Text>
        <Text style={styles.text}>Data Retention Period:</Text>
        {renderDataRetentionOptions()}
        <Text style={styles.text}>Notifications on Data Retention Period Deadline:</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(newValue) => { setNotificationsEnabled(newValue); savePreferences({ dataRetention, notificationsEnabled: newValue }); }}
          trackColor={{ false: "#767577", true: "#4B9CD3" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
        />
        <Text style={styles.header}>Health Data Collection Preferences</Text>
        {Object.keys(metrics).map((metric, index) => (
          <View key={index} style={styles.switchContainer}>
            <Text style={styles.metricText}>{metric.split(/(?=[A-Z])/).join(" ")}</Text>
            <Switch
              value={metrics[metric]}
              onValueChange={() => toggleSwitch(metric)}
              trackColor={{ false: "#4B9CD3", true: "#4B9CD3" }}
              thumbColor={metrics[metric] ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>
        ))}
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};



const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 35
  },
  container: {
    padding: 20,
  },
  modifyProfileButton: {
    backgroundColor: '#f0f0f0', // A soft grey that matches many designs
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d0d0d0', // Slight border for definition
  },
  modifyProfileButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  carousel: {
    paddingTop:10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  carouselItem: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  carouselItemSelected: {
    backgroundColor: '#4B9CD3',
  },
  carouselItemText: {
    color: 'black',
    fontSize: 16,
  },
  switchContainer: {
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricText: {
    fontSize: 16,
  },
});

export default DataManagementScreen;
