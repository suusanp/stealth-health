import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IntroPage = () => {
    const text = "blablabla";
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Welcome to [App]</Text>
            <Text style={styles.policyText}>
                Welcome to our app! At [this app], we aim to provide users with an overview of their health statistics without jeopardizing their privacy.
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

export default IntroPage;
