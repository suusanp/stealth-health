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
            <Text style={styles.title}>The Private Fitness App</Text>
            <Text style={styles.description}>Take back control</Text>
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
        marginTop: 150
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
    },
    description: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 100,
    }


});

export default Authenticate;