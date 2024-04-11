import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { savePreferences, getPreferences } from './FileSystemService';
import scheduleDeletionNotification from '../services/ScheduleNotifications';

// options for the data retention period
const DataRetentionOptions = [
  '3 Days', '1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year',
];

const DataManagement = () => {
  // default data retention period is set to be 1 month 
  const [dataRetention, setDataRetention] = useState('1 Month');
  // default for the notifications is they are disabled
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  // modal for the explanation of the notifications permission
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      // load the already existing preferences if previously any preferences was made
      const preferences = await getPreferences();
      // update the preferences if the user recently changed
      setDataRetention(preferences.dataRetention || '1 Month');
      setNotificationsEnabled(preferences.notificationsEnabled || false);
    };

    loadPreferences();

  }, []);

  // save the user preferences if they change
  useEffect(() => {
    savePreferences({
      dataRetention,
      notificationsEnabled,
    });
  }, [dataRetention, notificationsEnabled]);

  // if notificationsEnabled is true, schedule a notification. 
  useEffect(() => {
    if (notificationsEnabled) {
      scheduleDeletionNotification();
    }
  }, [notificationsEnabled, dataRetention]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Data Management</Text>
      <Text style={styles.description}>
        Finally, you have the option to determine how long your data
        will be kept in storage.
      </Text>

      <Text style={styles.description}>Please choose a data retention period below:</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {DataRetentionOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, dataRetention === option && styles.optionSelected]}
            onPress={() => setDataRetention(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.description}>
        Note that you can always download a PDF of your data report in the personal menu of the app. You can activate a notification to remind you to download your data before the retention period ends.
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Enable Notifications for Reminders:</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(newValue) => {
            setNotificationsEnabled(newValue);
            savePreferences({ dataRetention, notificationsEnabled: newValue });
          }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.important}>Why this is important for privacy</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Allowing the notifications will let you receive a notification when it is time for your data to be deleted, based on your data retention preferences. It will allow you to save your data as a PDF if you would like, or change your preferences.</Text>
            <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 80,
    marginTop: 160
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  important: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  carousel: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  option: {
    padding: 10,
    height: 40,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  optionSelected: {
    backgroundColor: '#007bff',
  },
  optionText: {
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DataManagement;
