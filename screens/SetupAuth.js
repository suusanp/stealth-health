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
            <Text style={styles.text}>Setup Authentication</Text>
            <Text style={styles.text}>Use FaceID?</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={authenticationEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={authenticationEnabled}
            />
            <Text style={styles.text}>{authenticationEnabled ? 'Face ID has been enabled' : 'Face ID has been disabled'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 20,
        marginBottom: 20,
      },

});

export default SetupAuth;


// ask password before deleting faceid