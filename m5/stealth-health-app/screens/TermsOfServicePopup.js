import React, { useState } from 'react';
import { View, Text, Button, Modal, ScrollView, StyleSheet, Switch } from 'react-native';
import { deleteAll } from '../backend/DeleteData';
import { CommonActions, useNavigation } from '@react-navigation/native';
import PrivacyPolicyText from './privacyPolicies/PrivacyPolicyText';
import TermsOfServiceText from './privacyPolicies/TermsOfServiceText';

/**
 * Popup component to display ToS and Privacy Policy
 * @param {boolean} visible 
 * @param {Function} onAgree Function to call when user agrees with the terms
 * @param {Function} onClose Function to call when the user closes the terms 
 * @returns 
 */
const TermsOfServicePopup = ({ visible, onAgree, onClose }) => {
  const navigation = useNavigation();
  const [preferences, setPreferences] = useState({
    calorieTracking: false,
    sleepTracking: false,
    pedometer: false,
  });

  /**
   * switch for the specified preference
   * @param {string} preference 
   */
  const handlePreferenceChange = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  //Function to call when user agrees with the ToS and Privacy Policy
  const onAgreeWithPreferences = () => {
    console.log('User Preferences:', preferences);
    onAgree();
  };

  //Function to call when user disagrees with the ToS and Privacy Policy
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 50, paddingBottom: 20 }}>Privacy Policy</Text>
            <Text style={styles.termsText}>{PrivacyPolicyText}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 20, paddingBottom: 20 }}>Terms of Service</Text>
            <Text style={styles.termsText}>{TermsOfServiceText}</Text>
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
    borderRadius: 80,
    alignItems: 'center',
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
