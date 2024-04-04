import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const DropdownModal = ({ visible, options, onSelect, closeModal }) => (
  <Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalView}>
        <ScrollView>
          {options.map((item, index) => (
            <TouchableOpacity key={index} style={styles.modalItem} onPress={() => onSelect(item)}>
              <Text style={styles.modalItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const UserProfileData = ({ onNext }) => {
  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalOnSelect, setModalOnSelect] = useState(() => {});

  const ageRanges = [" ","18-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-99"];
  const genders = [" ","Male", "Female", "Other"];

  useEffect(() => {
    const loadUserProfile = async () => {
      const loadedAgeRange = await SecureStore.getItemAsync('ageRange');
      const loadedGender = await SecureStore.getItemAsync('gender');
      const loadedHeight = await SecureStore.getItemAsync('height');
      const loadedWeight = await SecureStore.getItemAsync('weight');

      if (loadedAgeRange) setAgeRange(loadedAgeRange);
      if (loadedGender) setGender(loadedGender);
      if (loadedHeight) setHeight(loadedHeight);
      if (loadedWeight) setWeight(loadedWeight);
    };

    loadUserProfile();
  }, []);

  const saveData = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const openModal = (options, onSelect) => {
    setModalOptions(options);
    setModalOnSelect(() => onSelect);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>
      Welcome! Let's get your profile set up. Don't worry, you can choose what to share with us. Your privacy matters to us.
   
      </Text>
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>Age Range:</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => openModal(ageRanges, setAgeRange)}>
          <Text style={styles.dropdownText}>{ageRange || "Select"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>Gender:</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => openModal(genders, setGender)}>
          <Text style={styles.dropdownText}>{gender || "Select"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <DropdownModal
        visible={modalVisible}
        options={modalOptions}
        onSelect={(value) => {
          modalOnSelect(value);
          setModalVisible(false);
        }}
        closeModal={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    textAlign: 'center',
    fontSize: 18,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    width: '80%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  introText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 16,
    marginRight: 10,
    flex: 1,
  },
  dropdown: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default UserProfileData;
