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
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { CommonActions } from '@react-navigation/native';
import { deleteAll } from '../backend/DeleteData';
import Icon from 'react-native-vector-icons/Entypo';
import { getDailyData } from '../backend/DailyDataManagement';
import PrivacyPolicyText from './privacyPolicies/PrivacyPolicyText';
import TermsOfServiceText from './privacyPolicies/TermsOfServiceText';
import { getComputedMetrics } from '../metricsCalculation/metricsUtils';


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
    activityTracking: false,
  });


  const createHtmlForPDF = async () => {
    // Determine the dates to include based on the data retention setting
    const dataRetentionPeriods = {
      '3 Days': 3,
      '1 Week': 7,
      '2 Weeks': 14,
      '1 Month': 30,
      '3 Months': 90,
      '6 Months': 180,
      '1 Year': 365,
    };
    
    const retentionDays = dataRetentionPeriods[dataRetention] || 30; // Default to 1 Month if not found
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (retentionDays - 1));
  
    let html = "<html><head><title>Daily Data and Computations</title></head><body>";
    html += "<h1>Daily Data and Computations</h1>";
  
    for (let day = 0; day < retentionDays; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + day);
      const dateStr = currentDate.toISOString().split('T')[0];
      
      const dailyData = await getDailyData(dateStr);
      const computedMetrics = await getComputedMetrics(dateStr); 
  
      html += `<h2>Data for ${dateStr}</h2>`;
  
      if (dailyData) {
        html += "<h3>Daily Data</h3>";
        Object.keys(dailyData).forEach(key => {
          html += `<p><strong>${key}</strong>: ${dailyData[key]}</p>`;
        });
      } else {
        html += "<p>No daily data available.</p>";
      }
  
      if (computedMetrics) {
        html += "<h3>Computed Metrics</h3>";
        Object.keys(computedMetrics).forEach(key => {
          html += `<p><strong>${key}</strong>: ${computedMetrics[key]}</p>`;
        });
      } else {
        html += "<p>No computed metrics available.</p>";
      }
    }
  
    html += "</body></html>";
    return html;
  };
  
  const createPDF = async () => {
    const htmlContent = await createHtmlForPDF(); // Fetch and format the data
  
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generated at:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error("Could not create PDF:", error);
      Alert.alert("Error", "Could not create the PDF. Please try again.");
    }
  };
  

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

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.createPdfButton}
          onPress={createPDF}>
          <Text style={styles.createPdfButtonText}>Create PDF of Data</Text>
        </TouchableOpacity>

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
        <View style={styles.functionalitiesContainer}>
  <Text style={styles.header}>Available Functionalities:</Text>
  {availableFunctionalities.map((func, index) => (
    <View key={index} style={styles.functionalityItem}>
      <Icon name="controller-stop" size={18} color="#4A90E2" style={styles.bulletIcon} />
      <Text style={styles.metricText}>{func}</Text>
    </View>
  ))}
</View>

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
  functionalitiesContainer: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  functionalityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletIcon: {
    marginRight: 10,
  },
  metricText: {
    fontSize: 16,
    color: '#555',
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
  createPdfButton: {
    backgroundColor: '#4B9CD3', // Use your preferred color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  createPdfButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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