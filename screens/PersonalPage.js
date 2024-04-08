import React, { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getPreferences, savePreferences, getDataCollectionFlags, saveDataCollectionFlags } from '../backend/FileSystemService';
import BottomNavigationBar from '../components/BottomNavigationBar'; // Ensure this path is correct for your project structure
import * as LocalAuthentication from "expo-local-authentication";
import { checkAndDeleteOldFiles } from '../backend/FileSystemService';
import computeAvailableFunctionalities from '../metricsCalculation/metricsUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PushNotificationManager } from '../services/PushNotificationManager';
import scheduleDeletionNotification from '../services/ScheduleNotifications';
import { CommonActions } from '@react-navigation/native';
import { deleteAll } from '../backend/DeleteData';
import PrivacyPolicyText from './privacyPolicies/PrivacyPolicyText';
import TermsOfServiceText from './privacyPolicies/TermsOfServiceText';

const DataManagementScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dataRetention, setDataRetention] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [metrics, setMetrics] = useState({
    dailySteps: false,
    heartRate: false,
    bloodPressure: false,
    sleepPatterns: false,
    waterIntake: false,
  });


  const DataRetentionOptions = [
    '3 Days', '1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year',
  ];
  const [availableFunctionalities, setAvailableFunctionalities] = useState([]);

  useEffect(() => {
    const loadSettings = async () => {
      const preferences = await getPreferences();
      setDataRetention(preferences.dataRetention || '1 Month');
      setNotificationsEnabled(preferences.notificationsEnabled || false);
      const flags = await getDataCollectionFlags();
      setMetrics(flags);
      // Compute available functionalities based on initial metrics
      const functionalities = computeAvailableFunctionalities(flags);
      setAvailableFunctionalities(functionalities);

    };
    loadSettings();
  }, []);

  const toggleSwitch = async (metric) => {
    const updatedMetrics = { ...metrics, [metric]: !metrics[metric] };
    setMetrics(updatedMetrics);
    await saveDataCollectionFlags(updatedMetrics);
    const functionalities = computeAvailableFunctionalities(updatedMetrics);
    setAvailableFunctionalities(functionalities);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const handleDataRetentionChange = async (newOption) => {
    const indexNew = DataRetentionOptions.indexOf(newOption);
    const indexCurrent = DataRetentionOptions.indexOf(dataRetention);
    if (indexNew < indexCurrent) {
      Alert.alert(
        "Change Data Retention Period?",
        "Reducing the data retention period will delete older data permanently. This action cannot be undone. Do you want to proceed?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Confirm",
            onPress: async () => {
              setDataRetention(newOption);
              savePreferences({ dataRetention: newOption, notificationsEnabled });
              checkAndDeleteOldFiles();
              scheduleDeletionNotification();
              // Send a notification after data retention change
              if (notificationsEnabled) {
                await PushNotificationManager('Data Retention Period Changed', `Your data retention period has been changed to ${newOption}.`);
              }
            }
          }
        ]
      );
    } else {
      setDataRetention(newOption);
      savePreferences({ dataRetention: newOption, notificationsEnabled });
      scheduleDeletionNotification();
      // Send a notification after data retention change
      if (notificationsEnabled) {
        await PushNotificationManager('Data Retention Period Changed', `Your data retention period has been changed to ${newOption}.`);
      }
    }
  };

  const renderDataRetentionOptions = () => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.carousel}>
      {DataRetentionOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.carouselItem, dataRetention === option && styles.carouselItemSelected]}
          onPress={() => handleDataRetentionChange(option)}
        >
          <Text style={styles.carouselItemText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );


  async function onAuthenticate() {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Password',
    });
    setIsAuthenticated(auth.success);

    return auth.success;
  }


  async function onDeleteEverything() {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Delete Everything Now?",
        "All data will be immediately deleted. This action cannot be undone. Do you want to proceed?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(false), // Resolve the promise with `false` when "Cancel" is pressed
          },
          {
            text: "Confirm",
            onPress: async () => {
              const authenticationEnabled = await AsyncStorage.getItem("authenticationEnabled");
              if (authenticationEnabled === "true") {
                const isAuthenticated = await onAuthenticate();
                if (isAuthenticated) {
                  const deletionSuccessful = await deleteAll();
                  resolve(deletionSuccessful); // Resolve the promise with the return value of deleteAll
                } else {
                  Alert.alert("Deletion Failed. Please try again.");
                  resolve(false); // Resolve the promise with `false` when deletion fails
                }
              } else {
                const deletionSuccessful = await deleteAll();
                resolve(deletionSuccessful); // Resolve the promise with the return value of deleteAll
              }
            }
          }
        ]
      );
    });
  }

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
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
        <Text style={styles.header}>Available Functionalities:</Text>
        {availableFunctionalities.map((func, index) => (
          <Text key={index} style={styles.metricText}>{func}</Text>
        ))}
        <TouchableOpacity
          activeOpacity={0.8}

          style={styles.modifyAuthButton}
          onPress={async () => {
            const isAuthenticated = await onAuthenticate();
            if (isAuthenticated) {
              navigation.navigate('AuthSettings');
            }
          }}>
          <Text style={styles.modifyAuthButtonText}>Authentication Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.privacyPolicyButton}
          onPress={openModal}>
          <Text style={styles.privacyPolicyButtonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.modalContent}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', paddingTop: 30, paddingBottom:20 }}>Privacy Policy</Text>
                <Text>{PrivacyPolicyText}</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', paddingTop: 30 }}>Terms of Service</Text>
                <Text>{TermsOfServiceText}</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
        
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#000' }} />
        <Text style={{ marginTop: 40, fontSize: 22, color: 'red', fontWeight: 'bold' }}>Delete Now</Text>
        <Text style={{ marginTop: 20, fontSize: 16 }}>Once you delete everything, there is no going back. Please be certain.</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.deleteButton}
          onPress={async () => {
            const deleted = await onDeleteEverything();
            if (deleted) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'SettingsScreen' }],
                }),
              );
            }
          }}>
          <Text style={styles.deleteButtonText}>Delete Everything</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 35,
    paddingBottom: 70,
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
    paddingTop: 10,
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
  modifyAuthButton: {
    backgroundColor: '#2b2b2b', // A soft grey that matches many designs
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 1,
  },
  modifyAuthButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#d4d4d4'
  },
  privacyPolicyButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderColor: '#2b2b2b',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
    borderWidth: 1,
  },
  privacyPolicyButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2b2b2b'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    borderColor: 'red',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 1,
  },
  deleteButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 80,
    alignItems: 'center',
  },
  closeButton: {
    color: '#007bff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default DataManagementScreen;
