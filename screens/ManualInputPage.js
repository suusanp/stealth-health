import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDailyData, saveDailyData } from '../backend/DailyDataManagement';
import { getDataCollectionFlags } from '../backend/FileSystemService';
import { computeAndStoreMetrics } from '../metricsCalculation/metricsUtils';
import { useNavigation } from '@react-navigation/native';

const activities = [
  { label: 'Running', value: 'running' },
  { label: 'Cycling', value: 'cycling' },
  { label: 'Swimming', value: 'swimming' },
  { label: 'Hiking', value: 'hiking' },
  { label: 'Yoga', value: 'yoga' },
  { label: 'Pilates', value: 'pilates' },
  { label: 'CrossFit', value: 'crossfit' },
  { label: 'Dancing', value: 'dancing' },
  { label: 'Boxing', value: 'boxing' },
  { label: 'Rock Climbing', value: 'rock_climbing' },
  { label: 'Weight Training', value: 'weight_training' },
  { label: 'Skiing', value: 'skiing' },
  { label: 'Snowboarding', value: 'snowboarding' },
  { label: 'Surfing', value: 'surfing' },
  { label: 'Skateboarding', value: 'skateboarding' },
  { label: 'Kayaking', value: 'kayaking' },
  { label: 'Rowing', value: 'rowing' },
  { label: 'Jump Rope', value: 'jump_rope' },
];

/**
 * Manual Input Page to input daily health data
 * 
 */
const ManualInputPage = () => {
  const navigation = useNavigation();
  const [flags, setFlags] = useState({
    dailySteps: false,
    heartRate: false,
    bloodPressure: false,
    sleepPatterns: false,
    waterIntake: false,
    activityTracking: true,
  });
  const [dailyData, setDailyData] = useState({
    dailySteps: '',
    heartRate: '',
    bloodPressure: '',
    sleepPatterns: '',
    waterIntake: '',
    activityTracking: [],
  });
  const [dataChanged, setDataChanged] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [activityDuration, setActivityDuration] = useState('');

  useEffect(() => {
    /**
     * Load the flags and data related to the health data from backend 
     */
    const loadFlagsAndData = async () => {
      const dataFlags = await getDataCollectionFlags();
      setFlags(dataFlags);
      const today = new Date().toISOString().split('T')[0];
      const todayData = await getDailyData(today);
      if (todayData) {
        setDailyData({
          ...dailyData,
          dailySteps: todayData.dailySteps || '',
          heartRate: todayData.heartRate || '',
          bloodPressure: todayData.bloodPressure || '',
          sleepPatterns: todayData.sleepPatterns || '',
          waterIntake: todayData.waterIntake || '',
        }); }
      setDailyData(prevData => ({...prevData, activityTracking: todayData?.activityTracking || []}));
    };
    loadFlagsAndData();
  }, []);

  /**
   * Updates the value of the specified name-value pair
   * @param {string} name Field to be updated
   * @param {string} value New value to be updated to
   */
  const handleInputChange = (name, value) => {
    setDataChanged(true);
    setDailyData(prevData => ({...prevData, [name]: value}));
  };

  // Add new activity
  const handleAddActivity = () => {
    if (!selectedActivity || !activityDuration) {
      Alert.alert('Error', 'Please select an activity and specify the duration.');
      return;
    }
    const newActivity = { id: String(new Date().getTime()), name: selectedActivity, duration: activityDuration };
    setDailyData(prevData => ({...prevData, activityTracking: [...prevData.activityTracking, newActivity]}));
    setDataChanged(true);
    setSelectedActivity('');
    setActivityDuration('');
    setActivityModalVisible(false);
  };

  /**
   * Delete the activity specified by the id
   * @param {string} id 
   */
  const deleteActivity = id => {
    setDailyData(prevData => ({...prevData, activityTracking: prevData.activityTracking.filter(activity => activity.id !== id)}));
    setDataChanged(true);
  };

  // Renders all the added activities
  const renderActivities = () => dailyData.activityTracking && dailyData.activityTracking.length > 0 ? (
    <View style={styles.activitiesList}>
      {dailyData.activityTracking.map((activity, index) => (
        <View key={activity.id || index} style={styles.activityChip}>
          <Text style={styles.activityChipText}>{`${activity.name}: ${activity.duration} min`}</Text>
          <TouchableOpacity onPress={() => deleteActivity(activity.id)}>
            <Icon name="close" size={20} color="#f00" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  ) : null;

  // Saves evrything and exits
  const saveAndExit = async () => {
    if (dataChanged) {
      const today = new Date().toISOString().split('T')[0];
      await saveDailyData(dailyData, today);
      await computeAndStoreMetrics(today);
      Alert.alert("Data Saved", "Your daily data and computed metrics have been saved.");
      navigation.goBack();
    }
  };

  // Renders the added activities
  const renderActivitySelectionModal = () => (
    <Modal
      visible={activityModalVisible}
      animationType="slide"
      onRequestClose={() => setActivityModalVisible(false)}
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <FlatList
            data={activities}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.activityListItem, item.label === selectedActivity && styles.selectedActivity]}
                onPress={() => setSelectedActivity(item.label)}
              >
                <Text style={styles.activityListItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration in minutes"
            value={activityDuration}
            onChangeText={setActivityDuration}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  /**
   * Render the individual specified input field
   * @param {string} flag 
   * @param {string} placeholder 
   * @param {string} name 
   * @returns 
   */
  const renderInputField = (flag, placeholder, name) => (
    flags[flag] && (
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={placeholder}
          value={dailyData[name]}
          onChangeText={(value) => handleInputChange(name, value)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
    )
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Enter Today's Data</Text>
      {renderInputField("dailySteps", "Daily Steps", "dailySteps")}
      {renderInputField("heartRate", "Average Heart Rate (bpm)", "heartRate")}
      {renderInputField("bloodPressure", "Blood Pressure (mmHg)", "bloodPressure")}
      {renderInputField("sleepPatterns", "Hours Slept Last Night", "sleepPatterns")}
      {renderInputField("waterIntake", "Water Intake (ml)", "waterIntake")}
      <View style={{ marginVertical: 10 }}>
        {flags.activityTracking && (
          <>
            <TouchableOpacity onPress={() => setActivityModalVisible(true)} style={styles.activityInputButton}>
              <Text style={styles.activityInputButtonText}> + Add Activity</Text>
            </TouchableOpacity>
            {renderActivities()}
          </>
        )}
      </View>
      {renderActivitySelectionModal()}
      <TouchableOpacity
        style={[styles.saveButton, !dataChanged && styles.saveButtonDisabled]}
        onPress={saveAndExit}
        disabled={!dataChanged}
      >
        <Text style={styles.saveButtonText}>Save & Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  activityInputButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  activityInputButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  activityListItem: {
    padding: 10,
    width: '100%',
  },
  activityListItemText: {
    fontSize: 16,
  },
  selectedActivity: {
    backgroundColor: '#cce5ff',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  header: {
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
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginTop: 20,
  },
  activitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e1e1e1',
    borderRadius: 20,
    margin: 5,
  },
  activityChipText: {
    marginRight: 10,
  },
});

export default ManualInputPage;
