import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Make sure to import useNavigation hook

// Import your page components here
import UserProfileData from './UserProfileData';
import HealthMetrics from './HealthMetrics';
import DataManagement from './DataManagement';
// Ensure these components are correctly imported from their files

const SettingsScreen = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const navigation = useNavigation(); // Use the useNavigation hook to get access to navigation

  const pages = ['UserProfileData', 'HealthMetrics', 'DataManagement'];

  const nextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const renderPage = () => {
    switch (pages[currentPageIndex]) {
      case 'UserProfileData':
        return <UserProfileData />;
      case 'HealthMetrics':
        return <HealthMetrics />;
      case 'DataManagement':
        return <DataManagement />;
      default:
        return <UserProfileData />;
    }
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem('settingsCompleted', 'true'); // Mark the settings as completed
    console.log('Save settings');
    navigation.navigate('LandingPage'); // Navigate to the LandingPage after saving
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
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SettingsScreen;
