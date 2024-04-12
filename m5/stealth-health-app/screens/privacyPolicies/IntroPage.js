import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IntroPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to </Text>
            <Text style={styles.appName}>
            Stealth Health</Text>
            <Text style={styles.policyText}>
                Welcome to our app! At Stealth Health, we aim to provide users with an overview of their health statistics without jeopardizing their privacy.
            </Text>
            <Text style={styles.policyText}>
                Please take some time to read our Privacy Policy before proceeding. We will walk you through the policy during the setup process.
            </Text>
            <Text style={styles.policyText}>
                Let's begin! Click the "Next" button to proceed.
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
        textShadowRadius: 15, // Adjust the radius to control the intensity of the glow
        padding: 10
    },
    welcomeText: {
        fontStyle: 'italic',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 0,
        color: '#6E87C4',
        textShadowColor: 'rgba(100, 0, 200, 0.35)', // Blue color with opacity
        textShadowOffset: { width: 0, height: 0 }, // No offset
        textShadowRadius: 8, // Adjust the radius to control the intensity of the glow
        padding: 0
    },
});

export default IntroPage;
