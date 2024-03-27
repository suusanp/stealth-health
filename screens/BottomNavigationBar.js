import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Ensure you have `react-native-vector-icons` installed and properly linked

const BottomNavigationBar = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="home" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="user" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eaeaea',
  },
  navItem: {
    padding: 10,
  },
});

export default BottomNavigationBar;
