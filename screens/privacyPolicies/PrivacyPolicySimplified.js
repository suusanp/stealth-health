import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyPolicySimplified = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Privacy Policy</Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Information Collection:</Text> We only keep the information you type into our app on your own device. We don't collect anything else or share your data. Our app doesn’t send your data over the internet.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Data Usage:</Text> Your input is used for health calculations within the app, all processed locally. Your sensitive health info is encrypted for security.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Data Sharing:</Text> Your info is never shared outside your device; it stays private.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Your Control:</Text> You decide how long your data stays (3 days to 1 year), can delete your account/data anytime, and choose what health data to share for accurate metrics.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Data Retention:</Text> You can choose how long the app keeps your data, from days to a year. Deleting your account is easy too.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Analytics & Ads:</Text> The app doesn’t use analytics or show ads, keeping your data private from third parties.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Security Measures:</Text> Health data on your device is encrypted. You can also add extra security with Face ID or a phone password.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Policy Changes:</Text> If the policy changes, you’ll be notified and asked for consent again.
            </Text>
            <Text style={styles.policyText}>
                <Text style={styles.heading}>Contact Info:</Text> You can reach out to us for any questions or privacy concerns.
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
    policyText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    heading: {
        fontWeight: 'bold',
        color: '#765FAF',
        fontStyle: 'italic',
        backgroundColor: '#c7e3ff',
    },
});

export default PrivacyPolicySimplified;
