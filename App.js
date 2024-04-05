import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Authenticate from "./screens/Authenticate";
import LandingPage from "./screens/LandingPage";
import PersonalPage from "./screens/PersonalPage";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileManage from "./screens/ProfileManage";
import SyncPage from "./screens/SyncPage";
import WatchInputPage from "./screens/WatchInputPage";
import ManualInputPage from "./screens/ManualInputPage";
import { generateAndStoreKey, getEncryptionKey } from "./backend/SecureStoreService";
import { encryptData } from "./backend/EncryptionService";

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState('SettingsScreen'); // Default to SettingsScreen
  const [isAppInitialized, setAppInitialized] = useState(false);


  useEffect(() => {
    // Check if settings have been completed and also ensure encryption key is set up
    const initializeApp = async () => {
      //For Debugging (To test settings page)
      //AsyncStorage.clear(); 
      const settingsCompleted = await AsyncStorage.getItem("settingsCompleted");
      const authenticationEnabled = await AsyncStorage.getItem("authenticationEnabled");
      if (settingsCompleted === "true") {
        if (authenticationEnabled === "true"){
          setInitialRoute("Authenticate"); // User has turned on authentication, go to Authenticate
        }
        else {
          setInitialRoute("LandingPage"); // User has completed settings, go to LandingPage
        }
      }

      //Ensure an encryption key exists, or generate one
      const key = await getEncryptionKey();
      if (!key) {
        await generateAndStoreKey();
      }
      console.log("Encryption Key:", key);
      const ciphertext = await encryptData(key, "LandingPageblabla");
      console.log("ciphertext:", ciphertext);
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
