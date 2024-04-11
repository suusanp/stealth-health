import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, Switch, Alert} from 'react-native';
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetupAuth = () => {
    const [authenticationEnabled, setAuthenticationEnabled] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);


    // check if device supports biometrics
    useEffect( () => {
        (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
        }) ();
    });
    

    useEffect(() => {
        const getAuthenticationPreference = async () => {
          const storedPreference = await AsyncStorage.getItem('authenticationEnabled');
          if (storedPreference !== null) {
            setAuthenticationEnabled(JSON.parse(storedPreference));
          }
        };
      
        getAuthenticationPreference();
      }, []);


    const toggleSwitch = async () => {
        if (!isBiometricSupported) {
          Alert.alert(
            "Unsupported Feature",
            "Your device does not support Face ID.",
            [
              { text: "OK" }
            ]
          );
        } else {
            const previousState = !authenticationEnabled;
            setAuthenticationEnabled(previousState);
            await AsyncStorage.setItem('authenticationEnabled', JSON.stringify(previousState));
        }
      };


    return(
        <View style={styles.container}>
            <Text style={styles.header}>Setup Authentication</Text>
            <Text style={styles.text}>Use Face ID for authentication?</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={authenticationEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={authenticationEnabled}
                style={styles.switch}
            />
            <Text style={styles.text}>{authenticationEnabled ? 'Face ID enabled' : 'Face ID disabled'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      header: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 80,
        marginTop: 180
      },
      text: {
        fontSize: 20,
        marginBottom: 20,
      },
      switch: {
        marginBottom: 20,
      },

});

export default SetupAuth;