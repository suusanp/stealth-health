import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingPage from './screens/LandingPage';
import PersonalPage from './screens/PersonalPage';
import SettingsScreen from './screens/SettingsScreen';
import ProfileManage from './screens/ProfileManage';
import Authenticate from "./screens/Authenticate";
import AuthSettings from "./screens/AuthSettings";
import SyncPage from './screens/SyncPage';
import UserGoalsPage from './screens/UserGoalsPage';
import WatchInputPage from './screens/WatchInputPage';
import ManualInputPage from './screens/ManualInputPage';
import { generateAndStoreKey, getEncryptionKey } from './backend/SecureStoreService';
import { saveDailyData } from './backend/DailyDataManagement';
import { checkAndDeleteOldFiles } from './backend/FileSystemService';// Ensure correct path

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState('SettingsScreen'); // Default to SettingsScreen
  const [isAppInitialized, setAppInitialized] = useState(false);

  const generatePastData = async () => {
    for (let i = 1; i <= 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const mockData = {
        dailySteps: Math.floor(Math.random() * 10000),
        heartRate: Math.floor(Math.random() * 100),
        bloodPressure: `${Math.floor(Math.random() * 50 + 80)}/${Math.floor(Math.random() * 30 + 50)}`,
        hoursSlept: Math.floor(Math.random() * 10),
        waterIntake: Math.floor(Math.random() * 3000),
      };
      await saveDailyData(mockData, dateString);
    }
  };
  useEffect(() => {
    const initializeApp = async () => {
      //For Debugging (To test settings page)
      //AsyncStorage.clear(); 
      const settingsCompleted = await AsyncStorage.getItem("settingsCompleted");
      const authenticationEnabled = await AsyncStorage.getItem("authenticationEnabled");
      if (settingsCompleted === "true") {
        await generatePastData();
      checkAndDeleteOldFiles();
        if (authenticationEnabled === "true") {
          setInitialRoute("Authenticate"); // User has turned on authentication, go to Authenticate
        }
        else {
          setInitialRoute("LandingPage"); // User has completed settings, go to LandingPage
        }
      }

      const key = await getEncryptionKey();
      if (!key) {
        await generateAndStoreKey();
      }
      setAppInitialized(true);
    };

    initializeApp();



  }, []);

  if (!isAppInitialized) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Authenticate"
          component={Authenticate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthSettings"
          component={AuthSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalPage"
          component={PersonalPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileManage"
          component={ProfileManage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SyncPage"
          component={SyncPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WatchInputPage"
          component={WatchInputPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManualInputPage"
          component={ManualInputPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserGoalsPage"
          component={UserGoalsPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
