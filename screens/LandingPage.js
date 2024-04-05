import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityRing from '../components/ActivityRing'; // Adjust the import path as necessary
import TopNavigationBar from '../components/TopNavigationBar'; // Adjust the import path as necessary
import BottomNavigationBar from '../components/BottomNavigationBar'; // Adjust the import path as necessary
import TopTopBar from '../components/TopTopBar'; // Adjust the import path as necessary
import { getDailyData } from '../backend/DailyDataManagement';
import TermsOfServicePopup from './TermsOfServicePopup';  // Adjust the import path as necessary
import { format, addDays, subDays } from 'date-fns';
import {computeAndStoreMetrics, getComputedMetrics } from  '../metricsCalculation/metricsUtils';
import { useIsFocused } from '@react-navigation/native';


const LandingPage = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyData, setDailyData] = useState(null);
  const [canGoBack, setCanGoBack] = useState(true);
  const [computedMetrics, setComputedMetrics] = useState(null);
  const [canGoForward, setCanGoForward] = useState(false); 
  const isFocused = useIsFocused(); 
  const checkDataAvailability = async (date) => {
    // Simplified check. You might need more logic to determine actual data availability.
    const data = await getDailyData(format(date, 'yyyy-MM-dd'));
    return data !== null;
  };

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function checkAgreement() {
      const agreementStatus = await AsyncStorage.getItem('agreementStatus');
      if (!agreementStatus) {
        setShowPopup(true);
      }

    }

    checkAgreement();
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
              progress={dailyData.dailySteps ? dailyData.dailySteps / 10000 : 0} // Assuming 10,000 steps as 100% progress
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
              progress={computedMetrics.distance / 10} // Assuming 5 km as 100% progress
              color="#00897B"
            >
              <Text style={styles.ringText}>{computedMetrics.distance ? computedMetrics.distance.toFixed(2) : '0.00'}</Text>
              <Text style={styles.ringLabel}>km</Text>
            </ActivityRing>
          )}
          <View style={{ width: 10 }} />
          <ActivityRing size={100} progress={0.9} color="#43A047">
            <Text style={styles.ringText}>857</Text>
            <Text style={styles.ringLabel}>kcal</Text>
          </ActivityRing>
        </View>
        {computedMetrics && (
          <View style={styles.metricsContainer}>
            <Text style={styles.metricsText}>Distance Walked: {computedMetrics.distance} km</Text>
            <Text style={styles.metricsText}>BMI: {computedMetrics.bmi.toFixed(2)}</Text>
            <Text style={styles.metricsText}>BMR: {computedMetrics.bmr.toFixed(2)} kcal/day</Text>
          </View>
        )}
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
    paddingBottom: 10,
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
  metricsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  metricsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default LandingPage;