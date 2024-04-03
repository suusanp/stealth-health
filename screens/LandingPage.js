import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityRing from './ActivityRing'; // Adjust the import path as necessary
import TopNavigationBar from './TopNavigationBar'; // Adjust the import path as necessary
import BottomNavigationBar from './BottomNavigationBar'; // Adjust the import path as necessary
import TopTopBar from './TopTopBar'; // Adjust the import path as necessary
import TermsOfServicePopup from './TermsOfServicePopup'; // Adjust the import path as necessary

const LandingPage = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function checkAgreement() {
      const agreementStatus = await AsyncStorage.getItem('agreementStatus');
      if (!agreementStatus) {
        setShowPopup(true);
      }
    }

    checkAgreement();
  }, []);

  const handleAgree = async () => {
    await AsyncStorage.setItem('agreementStatus', 'agreed');
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopTopBar projectName="        Your Health Dashboard" navigation={navigation} />
      <TopNavigationBar title="Today" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{ height: 20 }} />
        <View style={styles.ringRow}>
          <ActivityRing size={200} progress={0.6} color="#4B9CD3">
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
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  ringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  ringText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#424242',
  },
  ringLabel: {
    fontSize: 16,
    color: '#424242',
    marginTop: 4,
  },
});

export default LandingPage;
