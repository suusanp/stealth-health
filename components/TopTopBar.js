import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'; // Make sure you have @react-navigation/native installed

/**
 * Top top navigation bar component: buttons for data input and user goals 
 * 
 * @param {Object} projectName 
 * 
 */
const TopTopBar = ({ projectName }) => {
  const [syncIconOpacity, setSyncIconOpacity] = useState(1);
  const [pencilIconOpacity, setPencilIconOpacity] = useState(1);
  const [chartIconOpacity, setChartIconOpacity] = useState(1);
  const navigation = useNavigation(); // Using useNavigation hook to get access to navigation object

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={() => setSyncIconOpacity(0.5)}
        onPressOut={() => setSyncIconOpacity(1)}
        onPress={() => navigation.navigate('SyncPage')} // Navigating to SyncPage when the sync icon is pressed
      >
        <Icon name="sync" size={26} color="#38b59f" style={{ opacity: syncIconOpacity, marginRight: 10, marginLeft:4 }} />
      </TouchableOpacity>
      <Text style={styles.projectName}>{projectName}</Text>
      <View style={styles.icons}>
        <TouchableOpacity
          onPressIn={() => setPencilIconOpacity(0.5)}
          onPressOut={() => setPencilIconOpacity(1)}
        >
          <Icon2 name="lock" size={26} color="#38b59f" style={{ opacity: pencilIconOpacity }} />
        </TouchableOpacity>
        <Text style={styles.projectName}> </Text>
        <TouchableOpacity
          onPressIn={() => setChartIconOpacity(0.5)}
          onPressOut={() => setChartIconOpacity(1)}
          hitSlop={{right: 40 }}
          onPress={() => navigation.navigate('UserGoalsPage')} // Navigate to UserGoalsPage
        >
          <Icon2 name="Trophy" size={26} color="#38b59f" style={{ opacity: chartIconOpacity, marginLeft: 10 }} />
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
    padding: 20,
    backgroundColor: 'white'
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
