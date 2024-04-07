import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { getDailyData, saveDailyData } from '../backend/DailyDataManagement';
import { getDataCollectionFlags } from '../backend/FileSystemService';
import { computeAndStoreMetrics } from '../metricsCalculation/metricsUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const allActivities = [
  { id: '1', name: 'Running' },
  { id: '2', name: 'Cycling' },
  // Add more activities as needed
];

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
    activities: [],
  });
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityDuration, setActivityDuration] = useState('');
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const loadFlagsAndData = async () => {
      const dataFlags = await getDataCollectionFlags();
      setFlags(dataFlags);

      const today = new Date().toISOString().split('T')[0];
      const todayData = await getDailyData(today);
      if (todayData) {
        setDailyData(todayData);
      }
    };

    loadFlagsAndData();
  }, []);

  const handleInputChange = (name, value) => {
    setDataChanged(true);
    setDailyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleAddActivity = () => {
    const selectedActivity = allActivities.find(a => a.id === selectedActivityId);
    if (!selectedActivity || !activityDuration) {
      Alert.alert('Error', 'Please select an activity and specify the duration.');
      return;
    }

    const newActivity = {
      id: Date.now().toString(),
      name: selectedActivity.name,
      duration: activityDuration,
    };

    setDailyData(prevData => ({
      ...prevData,
      activities: [...prevData.activities, newActivity],
    }));
    setDataChanged(true);
    setSelectedActivityId('');
    setActivityDuration('');
    setActivityModalVisible(false);
  };

  const deleteActivity = (id) => {
    setDailyData(prevData => ({
      ...prevData,
      activities: prevData.activities.filter(activity => activity.id !== id),
    }));
    setDataChanged(true);
  };
  const saveAndExit = async (updatedActivities = null) => {
    if (dataChanged) {
      const today = new Date().toISOString().split('T')[0];
      await saveDailyData({
        ...dailyData,
        date: today,
        activities: updatedActivities || dailyData.activities, // Use updated activities if provided
      });
      await computeAndStoreMetrics(today);
      Alert.alert('Data Saved', 'Your daily data and computed metrics have been saved.');
      navigation.goBack();
    }
  };
 

  const renderActivityChips = () => (
    <View style={styles.activitiesContainer}>
      {dailyData.activities.map((activity) => (
        <View key={activity.id} style={styles.activityChip}>
          <Text style={styles.activityChipText}>{`${activity.name} - ${activity.duration} min`}</Text>
          <TouchableOpacity onPress={() => deleteActivity(activity.id)}>
            <Icon name="close-circle" size={20} color="#f00" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => setActivityModalVisible(true)} style={styles.addActivityChip}>
        <Text style={styles.addActivityText}>+ Add Activity</Text>
      </TouchableOpacity>
    </View>
  );

  const ActivitySelectionModal = () => (
    <Modal
      visible={activityModalVisible}
      animationType="slide"
      onRequestClose={() => setActivityModalVisible(false)}
    >
      <View style={styles.modalContent}>
        <FlatList
          data={allActivities}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activityListItem} onPress={() => setSelectedActivityId(item.id)}>
              <Text style={styles.activityListItemText}>{item.name}</Text>
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
        <TouchableOpacity style={styles.closeButton} onPress={() => setActivityModalVisible(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );


  const renderInputField = (flag, placeholder, name) => (
    flags[flag] && (
      <TextInput
        placeholder={placeholder}
        value={dailyData[name]}
        onChangeText={(value) => handleInputChange(name, value)}
        keyboardType="numeric"
        style={styles.input}
      />
    )
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Enter Today's Data</Text>
      {renderInputField('dailySteps', 'Daily Steps', 'dailySteps')}
      {renderInputField('heartRate', 'Average Heart Rate (bpm)', 'heartRate')}
      {renderInputField('bloodPressure', 'Blood Pressure (mmHg)', 'bloodPressure')}
      {renderInputField('sleepPatterns', 'Hours Slept Last Night', 'sleepPatterns')}
      {renderInputField('waterIntake', 'Water Intake (ml)', 'waterIntake')}
      {renderActivityChips()}
      <ActivitySelectionModal />
      <TouchableOpacity
        style={[styles.saveButton, !dataChanged && styles.saveButtonDisabled]}
        onPress={saveAndExit}
        disabled={!dataChanged}>
        <Text style={styles.saveButtonText}>Save & Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  backButton: {
    marginBottom: 20,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 2,
    backgroundColor: '#e1e1e1',
    borderRadius: 20,
  },
  activityChipText: {
    marginRight: 10,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 10,
  },
  addActivityChip: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    margin: 2,
  },
  addActivityText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  activityListItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    width: '100%',
  },
  activityListItemText: {
    fontSize: 18,
    textAlign: 'center',
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
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default ManualInputPage;
