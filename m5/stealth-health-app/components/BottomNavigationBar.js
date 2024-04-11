// BottomNavigationBar.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

/**
 * Bottom navigation bar component: buttons for home and user screens on the bar
 * 
 * @param {Object} navigation 
 * 
 */
const BottomNavigationBar = ({ navigation }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('LandingPage')} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
        <Icon name="home" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PersonalPage')} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
        <Icon name="user" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0, 
    left: 0, 
    right: 0, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#9fd7ce',
    borderTopWidth: 5,
    borderColor: '#d8f8f3',
  },
  navItem: {
    padding: 20,
    paddingBottom: 30,
    marginTop: -15,
  },
});

export default BottomNavigationBar;
