import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingPage from './screens/LandingPage';
import PersonalPage from './screens/PersonalPage';
import SettingsScreen from './screens/SettingsScreen';
import ProfileManage from './screens/ProfileManage';
import SyncPage from './screens/SyncPage';
import WatchInputPage from './screens/WatchInputPage';
import ManualInputPage from './screens/ManualInputPage';
import { generateAndStoreKey, getEncryptionKey } from './screens/SecureStoreService';
import { encryptData } from './screens/EncryptionService';

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState('SettingsScreen'); // Default to SettingsScreen



  useEffect(() => {
    // Check if settings have been completed and also ensure encryption key is set up
    const initializeApp = async () => {
      const settingsCompleted = await AsyncStorage.getItem('settingsCompleted');
      if (settingsCompleted === 'true') {
        setInitialRoute('LandingPage'); // User has completed settings, go to LandingPage
      }

       //Ensure an encryption key exists, or generate one
      const key = await getEncryptionKey();
      if (!key) {
        await generateAndStoreKey();

      }
      console.log('Encryption Key:', key);
      const ciphertext = await encryptData(key,'LandingPageblabla')
      console.log('ciphertext:', ciphertext);
    };

    initializeApp();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalPage" component={PersonalPage} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileManage" component={ProfileManage} options={{ headerShown: false }}/>
        <Stack.Screen name="SyncPage" component={SyncPage} options={{ headerShown: false }} />
        <Stack.Screen name="WatchInputPage" component={WatchInputPage} options={{ headerShown: false }} />
        <Stack.Screen name="ManualInputPage" component={ManualInputPage} options={{ headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
