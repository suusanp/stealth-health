// SyncPage.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SyncPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 40 }}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Sync Your Data</Text>
      <Text style={styles.explanation}>
        Choosing when to sync your data empowers you with more control over your privacy. It allows for 
        deliberate decisions about what data to share and when, enhancing your data's security and 
        aligning with our commitment to user privacy.
      </Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate('WatchInputPage')}>
          <Icon2 name="watch-outline" size={24} color="#4B9CD3" style={styles.icon} />
          <Text style={styles.optionText}>Watch Sync</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate('ManualInputPage')}>
          <Icon name="pencil-outline" size={24} color="#4B9CD3" style={styles.icon} />
          <Text style={styles.optionText}>Manual Input</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
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
    lineHeight: 24, // Enhancing readability
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Light grey background for option buttons
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners for aesthetic touch
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
    fontSize: 18,
    color: '#333',
  },
});

export default SyncPage;
