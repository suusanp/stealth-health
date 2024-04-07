import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const UserGoalsPage = () => {
  const navigation = useNavigation();
  const [dailySteps, setDailySteps] = useState('');
  const [dailyDistance, setDailyDistance] = useState('');
  const [dailyCalories, setDailyCalories] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const steps = await SecureStore.getItemAsync('dailySteps');
        const distance = await SecureStore.getItemAsync('dailyDistance');
        const calories = await SecureStore.getItemAsync('dailyCalories');
        if (steps !== null) setDailySteps(steps);
        if (distance !== null) setDailyDistance(distance);
        if (calories !== null) setDailyCalories(calories);
      } catch (e) {
        console.log(e); 
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (dailySteps) {
      SecureStore.setItemAsync('dailySteps', dailySteps).catch(e => console.log(e));
    }
  }, [dailySteps]);

  useEffect(() => {
    if (dailyDistance) {
      SecureStore.setItemAsync('dailyDistance', dailyDistance).catch(e => console.log(e));
    }
  }, [dailyDistance]);

  useEffect(() => {
    if (dailyCalories) {
      SecureStore.setItemAsync('dailyCalories', dailyCalories).catch(e => console.log(e));
    }
  }, [dailyCalories]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Your Fitness Goals</Text>
      <Text style={styles.explanation}>
        Add some personal goals about your fitness journey to visually keep track of your progress!
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={setDailySteps}
        value={dailySteps}
        placeholder="Daily Steps Goal"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={setDailyDistance}
        value={dailyDistance}
        placeholder="Daily Distance Goal (in KM)"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={setDailyCalories}
        value={dailyCalories}
        placeholder="Daily Calories to Burn Goal"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', 
  },
  backButton: {
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  explanation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 24, 
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, 
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 50,
    color: '#333',
  },
  input: {
    height: 50,
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default UserGoalsPage;