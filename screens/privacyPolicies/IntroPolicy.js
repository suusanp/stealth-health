import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IntroPolicy = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Before We Begin</Text>
            <Text style={styles.policyText}>
                Before we ask you to enter any data, let's start by reviewing a simplified version of our Privacy Policy.
            </Text>
            <Text style={styles.policyText}>
                We will provide you with a detailed version of our policies at the end of the setup process, where you will have another chance to 'Agree' or 'Disagree'.
            </Text>
            <Text style={styles.policyText}>
                Your consent is important to us, so please take your time to read through the policies.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    policyText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#52427A',
    },
    appName: {
        fontStyle: 'italic',
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#6E87C4',
        textShadowColor: 'rgba(100, 0, 200, 0.35)', // Blue color with opacity
        textShadowOffset: { width: 0, height: 0 }, // No offset
        textShadowRadius: 20, // Adjust the radius to control the intensity of the glow
        padding: 10
    },
});

export default IntroPolicy;
