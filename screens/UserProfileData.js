import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Button, FlatList, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const [modalOnSelect, setModalOnSelect] = useState(() => { });

  const ageRanges = ["Select Age Range", "18-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-99"];
  const genders = ["Select Gender", "Male", "Female", "Other"];

  // "Why do we collect this" to be displayed on tap
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const explanationText = `
    Your height, weight, and sex are used to calculate your Body Mass Index (BMI) and Basal Metabolic Rate (BMR). Your age is used to calculate your target heart rate zones for exercise. 

    We ask for your age range rather than your exact age to further protect your privacy. By doing so, we can still provide you with accurate health statistics while minimizing the risk of re-identification.
  `;
  const toggleExplanationModal = () => {
    setShowExplanationModal(!showExplanationModal);
  };

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

  const clearAllInputs = async () => {
    setAgeRange(null);
    setGender(null);
    setHeight(null);
    setWeight(null);
    
    await SecureStore.deleteItemAsync('ageRange');
    await SecureStore.deleteItemAsync('gender');
    await SecureStore.deleteItemAsync('height');
    await SecureStore.deleteItemAsync('weight');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>
        Fit App</Text>
      <Text style={styles.introText}>
        Welcome to our app! At [this app], we aim to provide users with an overview of their health statistics without jeopardizing their privacy. Please choose whatever you are comfortable with, as all options are optional. Let's build your profile!
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="elderly" size={20} color="#333" style={styles.icon} />
        </View>
        <TouchableOpacity style={styles.dropdown} onPress={() => openModal(ageRanges, (value) => { setAgeRange(value); saveData('ageRange', value); })}>
          <Text style={styles.dropdownText}>{ageRange || "Select Age Range"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="gender-male-female" size={20} color="#333" style={styles.icon} />
        </View>
        <TouchableOpacity style={styles.dropdown} onPress={() => openModal(genders, (value) => { setGender(value); saveData('gender', value); })}>
          <Text style={styles.dropdownText}>{gender || "Select Gender"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="human-male-height" size={20} color="#333" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="black"
          keyboardType="numeric"
          value={height}
          onChangeText={(text) => { setHeight(text); saveData('height', text); }}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="weight-kilogram" size={20} color="#333" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="black"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => { setWeight(text); saveData('weight', text); }}
        />
      </View>
      <TouchableOpacity onPress={toggleExplanationModal} style={styles.explanationButton}>
        <Text style={styles.explanationButtonText}>Why do we need this?</Text>
      </TouchableOpacity>
      <Modal visible={showExplanationModal} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.modalItemText}>{explanationText}</Text>
          <Button title="Close" onPress={toggleExplanationModal} />
        </View>
      </Modal>
      <DropdownModal
        visible={modalVisible}
        options={modalOptions}
        onSelect={(value) => {
          modalOnSelect(value);
          setModalVisible(false);
        }}
        closeModal={() => setModalVisible(false)}
      />
      <TouchableOpacity style={styles.clearButton} onPress={clearAllInputs}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
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
  appName: {
    fontStyle: 'italic',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#6E87C4',
    textShadowColor: 'rgba(100, 0, 200, 0.35)', // Blue color with opacity
    textShadowOffset: { width: 0, height: 0 }, // No offset
    textShadowRadius: 20, // Adjust the radius to control the intensity of the glow
    padding: 20
  },
  introText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#483971'
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
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16
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
  icon: {
    color: '#8571B8',
    fontSize: 30,
  },
  explanationButton: {
    marginTop: 20,
    backgroundColor: '#6E87C4',
    padding: 8,
    borderRadius: 10,
    alignSelf: 'center',
  },
  explanationButtonText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 20,
    padding: 8,
    alignSelf: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#8571B8',
    fontWeight: 'bold'
  },
});

export default UserProfileData;
