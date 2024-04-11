import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityRing from '../components/ActivityRing'; // Adjust the import path as necessary
import TopNavigationBar from '../components/TopNavigationBar'; // Adjust the import path as necessary
import BottomNavigationBar from '../components/BottomNavigationBar'; // Adjust the import path as necessary
import TopTopBar from '../components/TopTopBar'; // Adjust the import path as necessary
import { getDailyData, saveDailyData } from '../backend/DailyDataManagement';
import TermsOfServicePopup from './TermsOfServicePopup';  // Adjust the import path as necessary
import { format, addDays, subDays } from 'date-fns';
import {computeAndStoreMetrics, getComputedMetrics } from  '../metricsCalculation/metricsUtils';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

/**
 * Landing Page component
 */
const LandingPage = ({ navigation }) => {
  // Initialize the goals and daily user data to default values
  const originalDate = new Date();
  const [stepsGoal, setDailyStepsGoal] = useState(10000);
  const [distanceGoal, setDailyDistanceGoal] = useState(5);
  const [caloriesGoal, setDailyCaloriesGoal] = useState(1200);
  const [currentDate, setCurrentDate] = useState(originalDate);
  const [dailyData, setDailyData] = useState(null);
  const [canGoBack, setCanGoBack] = useState(true);
  const [computedMetrics, setComputedMetrics] = useState(null);
  const [canGoForward, setCanGoForward] = useState(false); 
  const isFocused = useIsFocused(); 

  /**
   * Check Data Availability for a given date
   * @param {Date} date 
   * @returns {boolean} Return true if the data for the specified date is available, false if not
   */
  const checkDataAvailability = async (date) => {
    const data = await getDailyData(format(date, 'yyyy-MM-dd'));
    return data !== null;
  };

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    /**
     * Check the user's permissions and initialize the daily date depending on the permissions
     */
    async function checkAgreement() {
      const agreementStatus = await AsyncStorage.getItem('agreementStatus');
      if (!agreementStatus) {
        setShowPopup(true);
      }

      const originalDateDataSaved = await AsyncStorage.getItem('OGdataSaved');
      if (!originalDateDataSaved) {
        console.log(format(currentDate, 'yyyy-MM-dd'));
        await saveDailyData(null, format(currentDate, 'yyyy-MM-dd'));
        await AsyncStorage.setItem('OGdataSaved', 'true');
      }
    }

    checkAgreement();

    /**
     * Get and set daily data and the computed health metrics
     */
    const fetchData = async () => {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const data = await getDailyData(dateStr);
      setDailyData(data);
      await computeAndStoreMetrics(dateStr);
      const metrics = await getComputedMetrics(dateStr); // Retrieve computed metrics
      setComputedMetrics(metrics); // Set computed metrics to state

      const prevDayAvailable = await checkDataAvailability(subDays(currentDate, 1));
      const nextDayAvailable = await checkDataAvailability(addDays(currentDate, 1));
      setCanGoBack(prevDayAvailable);
      setCanGoForward(nextDayAvailable);
    };
    fetchData();
  }, [currentDate,isFocused]);

  /**
   * Get the user goals from the secure store
   */
  const loadGoals = async () => {
    try {
      const stepsGoalStr = await SecureStore.getItem('dailySteps');
      const distanceGoalStr = await SecureStore.getItem('dailyDistance');
      const caloriesGoalStr = await SecureStore.getItem('dailyCalories');
  
      console.log("Retrieved goals:", { stepsGoalStr, distanceGoalStr, caloriesGoalStr });
  
      setDailyStepsGoal(stepsGoalStr !== null ? parseInt(stepsGoalStr, 10) : 10000);
      setDailyDistanceGoal(distanceGoalStr !== null ? parseFloat(distanceGoalStr) : 5.0);
      setDailyCaloriesGoal(caloriesGoalStr !== null ? parseInt(caloriesGoalStr, 10) : 2000);
    } catch (e) {
      console.log(e); // Error handling
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGoals();
      return () => {};
    }, [])
  );

  const handleAgree = async () => {
    await AsyncStorage.setItem('agreementStatus', 'agreed');
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  
  const goBackADay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const goForwardADay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };
  const renderComputedMetrics = (metrics) => {
    const metricsComponents = [];
    Object.keys(metrics).forEach(key => {
      if (metrics[key] !== null && metrics[key] !== undefined) {
        metricsComponents.push(
          <View key={key} style={styles.metricContainer}>
            <Text style={styles.metricName}>{key.replace(/([A-Z])/g, ' $1').trim()}:</Text>
            <Text style={styles.metricValue}>{typeof metrics[key] === 'number' ? metrics[key].toFixed(2) : metrics[key]}</Text>
          </View>
        );
      }
    });
    return metricsComponents.length > 0 ? (
      <View style={styles.metricsContainer}>
        {metricsComponents}
      </View>
    ) : null;
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopTopBar projectName="Your Health Dashboard" navigation={navigation} />
      <TopNavigationBar
        title={currentDate.toISOString().split('T')[0]}
        onPressBack={goBackADay}
        onPressForward={goForwardADay}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{ height: 20 }} />
        <View style={styles.ringRow}>
          {dailyData && (
            <ActivityRing
              size={200}
              progress={dailyData.dailySteps ? Math.min((dailyData.dailySteps / stepsGoal), 1).toFixed(2) : 0} 
              color="#4B9CD3"
            >
              <Text style={styles.ringText}>{dailyData.dailySteps || 0}</Text>
              <Text style={styles.ringLabel}>Steps</Text>
            </ActivityRing>
          )}
        </View>
        <View style={styles.ringRow}>
          {computedMetrics && (
            <ActivityRing
              size={100}
              progress={parseFloat(Math.min(computedMetrics.distanceWalked / distanceGoal, 1).toFixed(2))} 
              color="#00897B"
            >
              <Text style={styles.ringText}>{computedMetrics.distanceWalked ? computedMetrics.distanceWalked.toFixed(2) : '0.00'}</Text>
              <Text style={styles.ringLabel}>km</Text>
            </ActivityRing>
          )}
          <View style={{ width: 10 }} />
          {computedMetrics && (
          <ActivityRing 
            size={100} 
            progress={ parseFloat(Math.min(computedMetrics.totalDailyCalorieExpense / caloriesGoal, 1).toFixed(1))}
            color="#43A047">
             <Text style={styles.ringText}>{computedMetrics.totalDailyCalorieExpense ? computedMetrics.totalDailyCalorieExpense.toFixed(0) : '0.00'}</Text>
            <Text style={styles.ringLabel}>kcal</Text>
          </ActivityRing>
          )}
        </View>
       {computedMetrics &&  renderComputedMetrics(computedMetrics)} 
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
      <TermsOfServicePopup
        visible={showPopup}
        onAgree={handleAgree}
        onClose={handleClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  ringRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  ringText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
  },
  ringLabel: {
    fontSize: 16,
    color: "#424242",
    marginTop: 4,
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 4,
  },
  metricName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  metricValue: {
    fontSize: 16,
    color: '#333',
  },
});

export default LandingPage;