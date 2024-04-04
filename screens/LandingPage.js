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


const LandingPage = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyData, setDailyData] = useState(null);
  const [canGoBack, setCanGoBack] = useState(true);
  const [canGoForward, setCanGoForward] = useState(false); // Assuming no future data for simplicity

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
    const fetchDataAndCheckAvailability = async () => {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const data = await getDailyData(dateStr);
      setDailyData(data);

      const prevDayAvailable = await checkDataAvailability(subDays(currentDate, 1));
      const nextDayAvailable = await checkDataAvailability(addDays(currentDate, 1));
      setCanGoBack(prevDayAvailable);
      setCanGoForward(nextDayAvailable);
    };
    
    fetchDataAndCheckAvailability();
  }, [currentDate]);

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
          <ActivityRing size={200} progress={0.1} color="#4B9CD3">
            <Text style={styles.ringText}>0</Text>
            <Text style={styles.ringLabel}>Steps</Text>
          </ActivityRing>
        </View>
        <View style={styles.ringRow}>
          <ActivityRing size={100} progress={0.3} color="#00897B">
            <Text style={styles.ringText}>0</Text>
            <Text style={styles.ringLabel}>km</Text>
          </ActivityRing>
          <View style={{ width: 10 }} />
          <ActivityRing size={100} progress={0.9} color="#43A047">
            <Text style={styles.ringText}>857</Text>
            <Text style={styles.ringLabel}>kcal</Text>
          </ActivityRing>
        </View>
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
});

export default LandingPage;
