import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const ProfileManage = () => {
  const navigation = useNavigation();
  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dataChanged, setDataChanged] = useState(false);

  const ageRanges = ["18-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-99"];
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    const loadProfileData = async () => {
      const savedAgeRange = await SecureStore.getItemAsync('ageRange');
      const savedGender = await SecureStore.getItemAsync('gender');
      const savedHeight = await SecureStore.getItemAsync('height');
      const savedWeight = await SecureStore.getItemAsync('weight');

      setAgeRange(savedAgeRange || ageRanges[0]);
      setGender(savedGender || genders[0]);
      setHeight(savedHeight || '');
      setWeight(savedWeight || '');
      setDataChanged(false);
    };
    loadProfileData();
  }, []);

  const selectOption = (options, setSelected) => {
    Alert.alert(
      "Select an option",
      "",
      options.map(option => ({
        text: option, onPress: () => { setSelected(option); setDataChanged(true); }
      })),
      { cancelable: true }
    );
  };

  const saveProfileData = async () => {
    await SecureStore.setItemAsync('ageRange', ageRange);
    await SecureStore.setItemAsync('gender', gender);
    await SecureStore.setItemAsync('height', height);
    await SecureStore.setItemAsync('weight', weight);
    Alert.alert('Profile Updated', 'Your profile information has been updated.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Profile Modification</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age Range:</Text>
        <TouchableOpacity style={styles.option} onPress={() => selectOption(ageRanges, setAgeRange)}>
          <Text style={styles.optionText}>{ageRange || "Select Age Range"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender:</Text>
        <TouchableOpacity style={styles.option} onPress={() => selectOption(genders, setGender)}>
          <Text style={styles.optionText}>{gender || "Select Gender"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={text => { setHeight(text); setDataChanged(true); }}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={text => { setWeight(text); setDataChanged(true); }}
        />
      </View>
      <TouchableOpacity 
        style={[styles.saveButton, dataChanged ? styles.saveButtonActive : {}]} 
        onPress={saveProfileData} 
        disabled={!dataChanged}>
        <Text style={styles.saveButtonText}>Save & Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
  },
  title: {
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
  option: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#ccc',
  },
  saveButtonActive: {
    backgroundColor: '#007bff',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileManage;
