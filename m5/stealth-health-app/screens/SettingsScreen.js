import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native'; 
import UserProfileData from './UserProfileData';
import HealthMetrics from './HealthMetrics';
import SetupAuth from './SetupAuth';
import DataManagement from '../backend/DataManagement';
import IntroPage from './privacyPolicies/IntroPage';
import IntroPolicy from './privacyPolicies/IntroPolicy';
import PrivacyPolicySimplified from './privacyPolicies/PrivacyPolicySimplified';

// Settings screen to handle all the settings page
const SettingsScreen = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const navigation = useNavigation(); // Use the useNavigation hook to get access to navigation

  const pages = ['IntroPage', 'IntroPolicy', 'PrivacyPolicySimplified', 'UserProfileData', 'HealthMetrics', 'SetupAuth', 'DataManagement'];

  // navigate to the next page, if possible to
  const nextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  // navigate to the previous page, if possible to
  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  // Render the current page 
  const renderPage = () => {
    switch (pages[currentPageIndex]) {
      case 'IntroPage':
        return <IntroPage />;
      case 'IntroPolicy':
        return <IntroPolicy />;
      case 'PrivacyPolicySimplified':
        return <PrivacyPolicySimplified />;
      case 'UserProfileData':
        return <UserProfileData />;
      case 'HealthMetrics':
        return <HealthMetrics />;
      case 'DataManagement':
        return <DataManagement />;
      case 'SetupAuth':
        return <SetupAuth />;
      default:
        return <UserProfileData />;
    }
  };

  // Saves the settings, navigates to landing page
  const saveSettings = async () => {
    await AsyncStorage.setItem('settingsCompleted', 'true'); // Mark the settings as completed
    console.log('Save settings');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LandingPage' }], // Navigate to the LandingPage after saving
      }),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderPage()}
      <View style={styles.navigationButtons}>
        {currentPageIndex > 0 && (
          <Button title="Previous" onPress={prevPage} />
        )}
        {currentPageIndex < pages.length - 1 ? (
          <Button title="Next" onPress={nextPage} />
        ) : (
          <Button title="Save and Exit" onPress={saveSettings} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
});

export default SettingsScreen;
