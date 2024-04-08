import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

const myImage = require("../assets/fitness_icon.png");

function Authenticate () {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigation = useNavigation();
    

    useEffect(() => {
        if (isAuthenticated) {
          navigation.navigate('LandingPage');
        }
      }, [isAuthenticated]);


    function onAuthenticate () {
        const auth = LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Enter Password',
        });
        auth.then(result => {
        setIsAuthenticated(result.success);
        });
    }



    return(
        <View>
            <Image source={myImage} style={styles.image}/>
            <Text style={styles.title}>Stealth Health</Text>
            <Text style={styles.description}>Take back control.</Text>
            <TouchableOpacity 
                onPress={onAuthenticate} 
                style={styles.btn}>
                <Text style={styles.text}>Unlock</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    btn: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#0893FC',
        padding: 10,
        borderRadius: 5,
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginTop: 150,
        shadowColor: 'rgba(100, 0, 200, 0.35)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    title: {
        fontSize: 50,
        fontWeight: '400',
        marginVertical: 30,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#6E87C4',
        textShadowColor: 'rgba(100, 0, 200, 0.35)', // Blue color with opacity
        textShadowOffset: { width: 0, height: 0 }, // No offset
        textShadowRadius: 20, // Adjust the radius to control the intensity of the glow
    },
    description: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 100,
    }


});

export default Authenticate;