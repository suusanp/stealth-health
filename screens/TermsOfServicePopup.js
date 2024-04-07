import React, { useState } from 'react';
import { View, Text, Button, Modal, ScrollView, StyleSheet, Switch } from 'react-native';
import { deleteAll } from '../backend/DeleteData';
import { CommonActions, useNavigation } from '@react-navigation/native';

const TermsOfServicePopup = ({ visible, onAgree, onClose }) => {
  const navigation = useNavigation();
  const [preferences, setPreferences] = useState({
    calorieTracking: false,
    sleepTracking: false,
    pedometer: false,
  });

  const handlePreferenceChange = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const termsOfServiceText = `
    Our Terms of Service (ToS) and Privacy Policy govern your use of this application. By using this application, you agree to comply with our ToS and Privacy Policy outlined below:
    ...
    ...
    ...
  `;

  const onAgreeWithPreferences = () => {
    // Save the preferences here (e.g., using AsyncStorage)
    // For simplicity, we'll just log them for now
    console.log('User Preferences:', preferences);

    // Trigger the original onAgree function
    
    onAgree();
  };

  const onDisagreeWithPreferences = async () => {
    await deleteAll();
    onClose();
    navigation.dispatch(
      CommonActions.reset({
         index: 0,
         routes: [{ name: 'SettingsScreen' }],
       }),
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Our ToS and Privacy Policy</Text>
          <ScrollView>
            <Text style={styles.termsText}>{termsOfServiceText}</Text>
            <Text style={styles.questionText}>Which functions are you interested in?</Text>
            <View style={styles.switchContainer}>
              <Text>Calorie Tracking</Text>
              <Switch
                value={preferences.calorieTracking}
                onValueChange={() => handlePreferenceChange('calorieTracking')}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text>Sleep Tracking</Text>
              <Switch
                value={preferences.sleepTracking}
                onValueChange={() => handlePreferenceChange('sleepTracking')}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text>Pedometer</Text>
              <Switch
                value={preferences.pedometer}
                onValueChange={() => handlePreferenceChange('pedometer')}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onDisagreeWithPreferences} />
            <Button title="Agree" onPress={onAgreeWithPreferences} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 16,
  },
  questionText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default TermsOfServicePopup;
