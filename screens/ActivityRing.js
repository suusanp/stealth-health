import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const ActivityRing = ({ size, progress, color, children }) => {
  const strokeWidth = size * 0.1; // Width of the ring line
  const radius = (size - strokeWidth) / 2; // Radius of the ring
  const circumference = radius * 2 * Math.PI; // Circumference of the ring
  const svgSize = size; // Size of the SVG container
  const halfSize = size / 2;

  return (
    <View style={styles.ringContainer}>
      <Svg width={svgSize} height={svgSize} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={halfSize}
          cy={halfSize}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={halfSize}
          cy={halfSize}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress * circumference}
        />
      </Svg>
      <View style={[styles.ringContent, { width: size, height: size }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActivityRing;
