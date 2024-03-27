import React from 'react';
import { View, Text, StyleSheet, SafeAreaView,ScrollView } from 'react-native';
import ActivityRing from './ActivityRing';
import TopNavigationBar from './TopNavigationBar'; // Import TopNavigationBar
import BottomNavigationBar from './BottomNavigationBar'; // Import BottomNavigationBar

const LandingPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavigationBar title="Today" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{ height: 20 }} />
        <View style={styles.ringRow}>
          <ActivityRing size={200} progress={0.6} color="#00ACC1">
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
      <BottomNavigationBar />
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
    paddingTop: 10,
    paddingBottom: 50, // Space for the bottom navigation bar
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
  // Style for BottomNavigationBar component is needed if not defined in its own file
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 3,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eaeaea',
  },
  navItem: {
    padding: 10,
  },
  // Add more styling as needed
});

export default LandingPage;
