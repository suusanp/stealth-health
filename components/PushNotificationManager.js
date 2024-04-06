import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function PushNotificationManager(title, body) {
    try {
        //console.log('PushNotificationManager: Start');
        const expoPushToken = await registerForPushNotificationsAsync();
        //console.log('PushNotificationManager: Expo Push Token:', expoPushToken);

        await schedulePushNotification(title, body);
        console.log('PushNotificationManager: Notification sent successfully');

        return 'Success';
    } catch (error) {
        console.error('PushNotificationManager Error:', error);
        return 'Error';
    }
}

// export async function testNoti() {
//     try {
//         console.log('testNoti: Start');
//         const result = await PushNotificationManager('Test Title', 'Test Body');
//         console.log('testNoti: Result:', result);
//     } catch (error) {
//         console.error('testNoti Error:', error);
//     }
// }


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