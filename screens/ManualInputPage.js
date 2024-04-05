import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {  getDailyData, saveDailyData } from '../backend/DailyDataManagement';
import { getDataCollectionFlags } from '../backend/FileSystemService';
import { computeAndStoreMetrics } from '../metricsCalculation/metricsUtils'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ManualInputPage = () => {
  const navigation = useNavigation();
  const [flags, setFlags] = useState({
    dailySteps: false,
    heartRate: false,
    bloodPressure: false,
    sleepPatterns: false,
    waterIntake: false,
  });
  const [dailyData, setDailyData] = useState({
    dailySteps: '',
    heartRate: '',
    bloodPressure: '',
    sleepPatterns: '',
    waterIntake: '',
  });
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const loadFlagsAndData = async () => {
      const dataFlags = await getDataCollectionFlags();
      setFlags(dataFlags);

      const today = new Date().toISOString().split('T')[0];
      const todayData = await getDailyData(today);
      if (todayData) {
        setDailyData(todayData);
      }
    };

    loadFlagsAndData();
  }, []);

  const handleInputChange = (name, value) => {
    setDataChanged(true);
    setDailyData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveAndExit = async () => {
    if (dataChanged) {
      const today = new Date().toISOString().split('T')[0];
      await saveDailyData(dailyData, today);
      await computeAndStoreMetrics(today); 
      Alert.alert("Data Saved", "Your daily data and computed metrics have been saved.");
      navigation.navigate('SyncPage');
    }
  };

  const renderInputField = (flag, placeholder, name) => (
    flags[flag] && (
      <TextInput
        placeholder={placeholder}
        value={dailyData[name]}
        onChangeText={(value) => handleInputChange(name, value)}
        keyboardType="numeric"
        style={styles.input}
      />
    )
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SyncPage')}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Enter Today's Data</Text>
      {renderInputField("dailySteps", "Daily Steps", "dailySteps")}
      {renderInputField("heartRate", "Average Heart Rate (bpm)", "heartRate")}
      {renderInputField("bloodPressure", "Blood Pressure (mmHg)", "bloodPressure")}
      {renderInputField("sleepPatterns", "Hours Slept Last Night", "hoursSlept")}
      {renderInputField("waterIntake", "Water Intake (ml)", "waterIntake")}
      <TouchableOpacity 
        style={[styles.saveButton, !dataChanged && styles.saveButtonDisabled]} 
        onPress={saveAndExit} 
        disabled={!dataChanged}>
        <Text style={styles.saveButtonText}>Save & Exit</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ManualInputPage;
