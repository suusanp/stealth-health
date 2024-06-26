import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function PushNotificationManager(title, body) {
    try {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        await schedulePushNotification(title, body);
        return 'Success';
    } catch (error) {
        console.error('PushNotificationManager Error:', error);
        return 'Error';
    }
}

async function schedulePushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body
        },
        trigger: null,
    });
}


async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}