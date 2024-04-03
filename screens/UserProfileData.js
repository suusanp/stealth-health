import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Button, FlatList, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const DropdownModal = ({ visible, options, onSelect, closeModal }) => (
  <Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.modalView}>
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.modalItem} onPress={() => onSelect(item)}>
            <Text style={styles.modalItemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <Button title="Close" onPress={closeModal} />
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

  const ageRanges = ["18-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-99"];
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    // Load user profile data
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
        Welcome to our app! At [this app], we aim to provide users with an overview of their health statistics without jeopardizing their privacy. Please choose whatever you are comfortable with, as all options are optional. Let's build your profile!
      </Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => openModal(ageRanges, (value) => {setAgeRange(value); saveData('ageRange', value);})}>
        <Text style={styles.dropdownText}>{ageRange || "Select Age Range"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dropdown} onPress={() => openModal(genders, (value) => {setGender(value); saveData('gender', value);})}>
        <Text style={styles.dropdownText}>{gender || "Select Gender"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => {setHeight(text); saveData('height', text);}}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => {setWeight(text); saveData('weight', text);}}
      />
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    flex: 1
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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  introText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  dropdown: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownDropdown: {
    width: '90%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch', // Makes the button stretch to the width of the container
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UserProfileData;
