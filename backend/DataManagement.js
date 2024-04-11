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
        <ScrollView contentContainerStyle={styles.modalScrollView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <Text style={styles.bigHeading}>Why is it important that I have control over the data retention period?</Text>{'\n'}{'\n'}
                Imagine your local device as your personal journal where you keep your thoughts. Control over data retention on this device means you get to decide how long you keep certain things there.{'\n'}{'\n'}

                <Text style={styles.heading}>Keeping Ownership:</Text> You decide what goes in there and when to tear out pages. Similarly, you control what data stays on your device and when it gets deleted.{'\n'}
                <Text style={styles.heading}>Privacy Protection:</Text>You wouldn't want to keep entries there longer than necessary, especially sensitive information, to reduce the risk of someone unauthorized gaining access. Similarly, by controlling data retention on your device, you can ensure that sensitive information is not stored longer than needed. It's like having a timer on your journal that automatically erases it when it's no longer needed.{'\n'}
                <Text style={styles.heading}>Following Rules:</Text> The Canadian Personal Information Protection and Electronic Documents Act says you should have control over how long data stays on your device. We want to make sure you have that control.{'\n'}
                <Text style={styles.heading}>Personal Preferences:</Text> Just like some people like to keep old letters for memories and others prefer a clean space, you can decide how long you keep data on your device based on what you're comfortable with.{'\n'}
                <Text style={styles.heading}>Main Idea:</Text> In simple terms, controlling data retention on your device is like having a say in your own journal where you decide what stays and what goes. It's about keeping your personal space tidy, safe, and private.{'\n'}
              </Text>
              <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
            </View>
          </View>
        </ScrollView>
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
  modalScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  heading: {
    fontWeight: 'bold',
    color: '#765FAF',
    fontStyle: 'italic',
    backgroundColor: '#c7e3ff',
  },
  bigHeading: {
    fontWeight: 'bold',
    color: '#765FAF',
    fontStyle: 'italic',
    backgroundColor: '#fff',
    fontSize: 18,
  },
});

export default DataManagement;
