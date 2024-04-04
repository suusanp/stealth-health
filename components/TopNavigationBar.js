// TopNavigationBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TopNavigationBar = ({ title, onPressBack, onPressForward, canGoBack, canGoForward }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity disabled={!canGoBack} onPress={onPressBack}>
        <Icon name="chevron-left" size={30} color={canGoBack ? "#000" : "#ccc"} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity disabled={!canGoForward} onPress={onPressForward}>
        <Icon name="chevron-right" size={30} color={canGoForward ? "#000" : "#ccc"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopNavigationBar;
