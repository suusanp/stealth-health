import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Make sure you have @react-navigation/native installed

const TopTopBar = ({ projectName }) => {
  const [iconOpacity, setIconOpacity] = useState(1);
  const navigation = useNavigation(); // Using useNavigation hook to get access to navigation object

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={() => setIconOpacity(0.5)}
        onPressOut={() => setIconOpacity(1)}
        onPress={() => navigation.navigate('SyncPage')} // Navigating to SyncPage when the sync icon is pressed
      >
        <Icon name="sync" size={24} color="#000" style={{ opacity: iconOpacity }} />
      </TouchableOpacity>
      <Text style={styles.projectName}>{projectName}</Text>
      <View style={styles.icons}>
        <TouchableOpacity
          onPressIn={() => setIconOpacity(0.5)}
          onPressOut={() => setIconOpacity(1)}
          // Assuming you have a function to handle the pencil icon press
        >
          <Icon name="pencil" size={24} color="#000" style={{ opacity: iconOpacity }} />
        </TouchableOpacity>
        <Text style={styles.projectName}> </Text>
        <TouchableOpacity
          onPressIn={() => setIconOpacity(0.5)}
          onPressOut={() => setIconOpacity(1)}
          // Assuming you have a function to handle the chart bar icon press
        >
          <Icon name="chart-bar" size={24} color="#000" style={{ opacity: iconOpacity, marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TopTopBar;
