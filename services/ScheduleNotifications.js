// getDataRetentionPeriod.js
import { PushNotificationManager } from "./PushNotificationManager";
import { getPreferences } from '../backend/FileSystemService'; // Adjust the import path as per your project structure

async function scheduleDeletionNotification() {
    try {
        const preferences = await getPreferences();
        const dataRetentionPeriod = preferences.dataRetention; // Default to '1 Month' if not available
        // convert dataRetentionPeriod to seconds
        let seconds = 0;
        // if (dataRetentionPeriod === '5 Seconds') {
        //     seconds = 3610;
        // }
        if (dataRetentionPeriod === '1 Day') {
            seconds = 24 * 60 * 60;
        } else
            if (dataRetentionPeriod === '3 Days') {
                seconds = 3 * 24 * 60 * 60;
            } else
                if (dataRetentionPeriod === '1 Week') {
                    seconds = 7 * 24 * 60 * 60;
                } else if (dataRetentionPeriod === '1 Month') {
                    seconds = 30 * 24 * 60 * 60;
                } else if (dataRetentionPeriod === '3 Months') {
                    seconds = 3 * 30 * 24 * 60 * 60;
                } else if (dataRetentionPeriod === '6 Months') {
                    seconds = 6 * 30 * 24 * 60 * 60;
                } else if (dataRetentionPeriod === '1 Year') {
                    seconds = 365 * 24 * 60 * 60;
                }
        seconds = seconds * 1000; // convert seconds to milliseconds, as setTimeout uses milliseconds

        // send a notification to the user an hour before the data retention period is reached
        warning_seconds = seconds - 3600 * 1000;
        const warning_title = 'Data Retention Period Reached';
        const warning_body = 'Your data will be deleted in an hour. If you want to keep it, please take action now!';

        setTimeout(() => {
            PushNotificationManager(warning_title, warning_body);
        }, warning_seconds);
        // send a notification to the user when the data retention period is reached
        const title = 'Data Retention Period Reached';
        const body = 'Your data has been deleted.';

        setTimeout(() => {
            PushNotificationManager(title, body);
        }, seconds);

        console.log('Seconds until warning:',warning_seconds / 1000, 'Seconds until deletion:', seconds / 1000);

    } catch (error) {
        console.error('Error fetching Data Retention Period:', error);
    }
}

export default scheduleDeletionNotification;




