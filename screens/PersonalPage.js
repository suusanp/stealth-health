import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getPreferences, savePreferences, getDataCollectionFlags, saveDataCollectionFlags } from '../backend/FileSystemService';
import BottomNavigationBar from '../components/BottomNavigationBar'; // Ensure this path is correct for your project structure
import * as LocalAuthentication from "expo-local-authentication";
import { checkAndDeleteOldFiles } from '../backend/FileSystemService';
import computeAvailableFunctionalities from '../metricsCalculation/metricsUtils';
import { PushNotificationManager } from '../services/PushNotificationManager';
import scheduleDeletionNotification from '../services/ScheduleNotifications';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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


  const createHtmlForPDF = (dataFlags) => {
    // Convert your data flags into HTML format.
    // Here's a very basic example:
    let html = "<html><head><title>Data Collection Flags</title></head><body>";
    html += "<h1>Data Collection Flags</h1>";
    Object.keys(dataFlags).forEach(key => {
      html += `<p><strong>${key}</strong>: ${dataFlags[key]}</p>`;
    });
    html += "</body></html>";
    return html;
  };

  const createPDF = async () => {
    // Gather data for the PDF
    const dataFlags = await getDataCollectionFlags();
    const htmlContent = createHtmlForPDF(dataFlags); // Implement this function to create HTML from your data
    
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generated at:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      // For showing the PDF within the app, you can navigate to a screen with a WebView and load the PDF uri
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
    console.log(auth);

    return auth.success;
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
});

export default DataManagementScreen;