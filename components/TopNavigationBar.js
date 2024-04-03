// TopNavigationBar.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TopNavigationBar = ({ title }) => {
  // State to manage the opacity of icons on press
  const [iconOpacity, setIconOpacity] = useState({
    back: 1,
    forward: 1,
    edit: 1,
    stats: 1,
  });

  // Handle icon press events
  const handleIconPress = (icon) => {
    // Here you'd have the logic for handling press
    console.log(`${icon} icon pressed`);
  };

  // Update the opacity of an icon when pressed
  const handleIconPressIn = (icon) => {
    setIconOpacity({ ...iconOpacity, [icon]: 0.5 });
  };

  // Reset the opacity of an icon when the press is released
  const handleIconPressOut = (icon) => {
    setIconOpacity({ ...iconOpacity, [icon]: 1 });
  };

  return (
    <View style={styles.navBar}>
   
      <TouchableOpacity
        onPressIn={() => handleIconPressIn('back')}
        onPressOut={() => handleIconPressOut('back')}
        onPress={() => handleIconPress('back')}>
        <Icon name="chevron-left" size={30} color="#000" style={{ opacity: iconOpacity.back }} />
      </TouchableOpacity>
      
      <Text style={styles.title}>  {title}</Text>
      
      <View style={styles.iconsRight}>

        <Text> </Text>
        <TouchableOpacity
          onPressIn={() => handleIconPressIn('forward')}
          onPressOut={() => handleIconPressOut('forward')}
          onPress={() => handleIconPress('forward')}>
          <Icon name="chevron-right" size={30} color="#000" style={{ opacity: iconOpacity.forward }} />
        </TouchableOpacity>
      </View>
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
  iconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Styles for icons, text, and other elements...
});

export default TopNavigationBar;
