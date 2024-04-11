// TopNavigationBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Top navigation bar component: backward and forward arrows to navigate through different days on the dashboard
 * 
 * @param {string} title The title displayed in the center of the bar: the date
 * @param {Function} onPressBack Function to call when the back button is pressed
 * @param {Function} onPressForward Function to call when the forward button is pressed
 * @param {boolean} canGoBack true if it is possible to actually navigate backwards, false if not
 * @param {boolean} canGoForward true if it is possible to actually navigate forward, false if not
 */
const TopNavigationBar = ({ title, onPressBack, onPressForward, canGoBack, canGoForward }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity disabled={!canGoBack} onPress={onPressBack}>
        <Icon name="chevron-left" size={30} color={canGoBack ? "#141616" : "#fff"} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity disabled={!canGoForward} onPress={onPressForward}>
        <Icon name="chevron-right" size={30} color={canGoForward ? "#141616" : "#fff"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 3,
    borderBottomWidth:3,
    borderColor: '#d8f8f3',
    backgroundColor: '#9fd7ce',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopNavigationBar;
