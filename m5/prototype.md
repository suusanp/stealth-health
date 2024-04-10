# Prototype Report for the Stealth Health System

## Introduction
### **Overview of the system**: 
Stealth Health is a health and fitness application that aims to provide privacy-focused health tracking and analytics to users. The system is designed to collect and analyze user health data while prioritizing user privacy and data security. The Stealth Health system includes features such as activity tracking, sleep monitoring, and nutrition logging, while ensuring that users have full control over their data and can make informed decisions about its use. 

### **Purpose and Scope**: 
The aim behind developing the Fitbit app prototype and the scope covered in this prototype phase.

## Research Method
- **Technical Literature Review**
  - Review of existing Fitbit app
- **Literature Search**
  - Investigation into reported privacy concerns within fitness tracking applications.
- **Privacy Notices Review**
  - Detailed analysis of Fitbit’s privacy policy and data handling practices from a privacy standpoint.

## Implementation Details

### Rationale for Selecting React Native

We chose React Native for our Fitbit app prototype due to its cross-platform capabilities, to develop a single codebase that can be deployed on both iOS and Android devices. Our group members use both Android and Apple devices, and we wanted to ensure that the app would be accessible to all team members during the development process. Additionally, React Native has extensive documentation and a large community, which we can use for troubleshooting and support since none of our team members had prior experience with mobile app development. Our team has also had previous experience developing in React, which made the transition to React Native smoother.

### Expo as a Development Platform

Expo is a comprehensive framework for developing React Native applications across iOS, Android, and web platforms. It simplifies the development process by abstracting complex platform-specific details, enabling our team to focus on creating a seamless user experience.

### Rationale for Selecting Expo

Expo is renowned for facilitating the development of cross-platform applications with React Native, putting efficiency and developer experience at the forefront. It is open-source and has a large community of developers, so as beginners to mobile app development, we can easily get started with Expo. We also chose Expo because it is test-friendly; We each downloaded the Expo Go app, which allows us to preview the app on real devices during development. 

#### Evaluation of Expo's Privacy Policies and Open-Source Nature

Expo's commitment to privacy is evident through its GDPR, CCPA, and Privacy Shield compliance, ensuring the responsible handling of both developer and end-user data. This commitment is articulated in their Privacy Policy, updated on June 22nd, 2022, and further explained in their privacy exposition dated February 7th, 2020.

- **Data Collection and Use**: "When you create an account on Expo or use our tools and services, we collect data including your name, email, and, if you enable paid services, your billing information... This data helps us make decisions about our products and services, in addition to allowing us to deliver satisfactory user experiences." (Expo, Privacy Policy)

- **Data Processor and Controller Roles**: "When a developer uses Expo's services to create an app and distributes it to their users (end-users), we become a data processor because we process end-user data on behalf of the developer." (Expo, Privacy Explained)

- **End-User Data Minimalism**: "When end-users use apps built by Expo, we collect very little end-user data. The data we may collect includes the end-user's push token... These requests do not contain identifying information such as unique device identifiers." (Expo, Privacy Explained)

- **Security and Compliance**: The explicit statement that Expo is "GDPR-, CCPA-, and Privacy Shield-compliant" in all scenarios underscores a robust framework for privacy and data protection.

#### Open-Source Contribution
Expo's open-source ecosystem is important, offering transparency and community engagement that aligns with our project's philosophy. 


### Database Structure and Data Encryption

#### What Type of Data We Collect and How It Is Organized

In our application, user data is categorized into three distinct types: Sensitive Data, Daily Data, and User Preferences and Goals. Additionally, we incorporate user consent flags for data collection and offer customizable data retention periods, respecting user preferences and enhancing data privacy.

- **Sensitive Data**: Securely stored using Expo's `SecureStore` and encrypted with `Crypto`, this category includes:
  - Age Range (e.g., "18-29", "30-39", etc.)
  - Gender (Options: "Male", "Female", "Other")
  - Height (cm)
  - Weight (kg)
  - Fitness Goals

- **Daily Data**: Collects day-to-day metrics for monitoring health and activity, including:
  - Daily Steps
  - Heart Rate (BPM)
  - Blood Pressure (mmHg)
  - Sleep Patterns (Hours)
  - Water Intake (ml)
  - Activity Tracking (Type and duration of physical activities)

- **User Preferences and Goals**: Stores goals and preferences to personalize the user experience. Data includes:
  - Daily Steps Goal
  - Daily Distance Goal (Km)
  - Daily Calories Burn Goal
  - Data Collection Flags: Boolean flags to indicate the user's consent for collecting specific metrics (`dailySteps`, `heartRate`, `bloodPressure`, `sleepPatterns`, `waterIntake`, `activityTracking`).
  - Data Retention Period: The duration for which the user wishes to retain their data, ranging from "3 Days" to "1 Year".

Sensitive data is encrypted and stored locally to prevent unauthorized access. Daily data collection is mapped on the users data collection consent, users can control what information will be prompted from them. User preferences, including goals and data retention settings, are customizable at all times, allowing them to define their interaction with the app and how long their data is stored.

#### Choosing the Right Storage Solution

When selecting a storage solution for our application, we evaluated various options, including SQLite and server-based solutions. While SQLite is a widely used database for storage in mobile applications, it typically does not store data directly on the device. A local storage approach aligns with our goal to avoid storing sensitive user data on servers due to the inherent risks of server-side data breaches and unauthorized access.

Furthermore we were concerned By  SQLite was its limited support for built-in encryption. Ensuring the privacy and security of user data is paramount in our application; thus, we sought a solution that offered robust encryption capabilities out of the box. The need for encryption is not just about protecting data if the device is lost or compromised; it's about ensuring that data remains private and secure from any unauthorized access, intentional or accidental.

#### SecureStore for Sensitive Permanent and Semi-Permanent Information

Given these considerations, we decided to utilize Expo's SecureStore for storing sensitive personal information. SecureStore offers an encrypted key-value store, which provides several advantages:

- **Encryption by Default**: SecureStore automatically encrypts data before it is saved, providing encryption at rest without the need for additional encryption layers.

- **Ease of Use**: With SecureStore, we benefit from an intuitive API for storing and retrieving encrypted data. 

- **Platform Security Features**: SecureStore leverages the uses the security features of the device's platform, offering a level of security that is consistent with the device's overall security.


Significant features of SecureStore include:

- **Data Isolation**: It ensures data is stored within the app's sandbox, preventing access by other apps and safeguarding against unauthorized data breaches.

- **Dynamic Management**: The following segments of our code demonstrate how we securely handle user data, such as age range, gender, height, weight, and fitness goals.

    ```javascript
    export const getPersonalInfo = async () => {
  // Define the keys for the personal information we want to retrieve
  const keys = ['ageRange', 'gender', 'height', 'weight', 'fitnessGoals'];
  const info = {};
  
  // Iterate over the keys, retrieving each piece of information from SecureStore
  // and adding it to the info object. This demonstrates how SecureStore can be used
  // to securely retrieve encrypted data.
  for (const key of keys) {
    const value = await SecureStore.getItemAsync(key);
    info[key] = value;
  }
  return info: };
 
 To update their data, users go through functions that retrieve their current data ( using getPersonalInfo), allow them to make changes, and then save these updates back to the device securely ( usingsavePersonalInfo) new information will overwrite the previous one, no history of the old data is kept within our software. If a user chooses to delete their data, our application uses SecureStore's deleteItemAsync for each data point, ensuring all personal information is removed from the device. This maintains data security and gives users complete control over their information.

#### Encryption and Decryption Methodology for daily data
We employ a dynamic encryption key generation strategy using `expo-crypto`'s SHA256 digest. This choice is driven by SHA256's cryptographic security, providing a strong hash function that is resistant to collision attacks. The code snippet below showcases the process:

```javascript
import * as Crypto from 'expo-crypto';

export const generateAndStoreKey = async () => {
  const uniqueSeed = `${new Date().toISOString()}${Math.random()}`;
  const encryptionKey = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    uniqueSeed,
    { encoding: Crypto.CryptoEncoding.HEX }
  );
  await SecureStore.setItemAsync('encryptionKey', encryptionKey);
};
```

- **Usage of SHA256**:  We chose this algorithm for its widespread acceptance as a secure hash algorithm, providing a good balance between speed and security.
- **Unique Seed Generation**: Combining the current ISO date string with a random number ensures that the seed for our hash is highly unpredictable, this makes the encryption key harder to guess.
- **Secure Storage of Key**: The resulting encryption key, is stored securely using expo-secure-store for the reasons mentionned in the above section (isolating it within the device's secure storage and ensuring it's not accessible without authentication).

We then encrypt the health metrics using the AES encryption funtion provided by CryptoJS. AES is particularly suitable for mobile environments where computational resources are limited as it can encrypt large amounts of data quickly. Below is the implementation detail:

```javascript
import * as FileSystem from 'expo-file-system';
import CryptoJS from 'react-native-crypto-js';
import { getEncryptionKey } from './SecureStoreService';

const dailyDataDirectory = `${FileSystem.documentDirectory}dailyData/`;

export const saveDailyData = async (data, date) => {
    const encryptionKey = await getEncryptionKey();
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    const filePath = dailyDataDirectory + `${date}.json`;

    await FileSystem.writeAsStringAsync(filePath, ciphertext);
};
```
- **JSON Stringification**: Prior to encryption, the data is stringified to ensure compatibility with the encryption library, as CryptoJS operates on string inputs.
- **File System Storage**: The Encrypted data is stored in the device's file system, under a directory specific to daily data, to ease future data retrieval.

#### Storage of user data amangement preferences and fitness goals





### Data Analytics and Privacy Implications
  - Overview of algorithms used for health data analysis and their implications on user privacy. explain how we are managing what is computed based on the users data management preferences.

  
### User Interface Design and Data Input
  - Insights into optional data inputs, transparency features, and the manual data input and sync functionalities. So manual sync in details and Watch sync Explain linking to API. 
### Data Management and User Consent 
  - Strategies implemented for data retention period notifications, health data collection preferences, and enhancing user control. Explain the functioning of the data retention algorithm and how the retrieved pdf is generated. 
### Authentication and Data Protection
  - Use of biometric authentication (Expo LocalAuthentication) for data protection and the measures taken to secure user data access.


## Conclusions
- **Summary of Key Findings**: Concise overview of the significant outcomes from this prototype development.
- **Insights on Privacy Design Strategies Implemented**: Discussion on the application of Minimize, Separate, Abstract, and Hide strategies.
- **Lessons Learned**: Key takeaways from incorporating privacy-by-design principles in the Fitbit app development process.

## Appendix
- **Technical Specifications and Documentation**: Detailed technical information and app documentation.
- **Detailed Analysis Reports and Data Sets**: Extensive analysis and data sets supporting the research findings.
- **User Feedback and Survey Results**: Compilation of user feedback and results from surveys conducted.