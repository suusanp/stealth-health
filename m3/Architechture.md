# Alternative Fitness App: Privacy-First Architecture Design

Due to privacy concerns with the Fitbit API, we will develope an alternative application which tracks fitness and health data while prioritizing user privacy.

Our application's architecture focuses on user control over personal data. Our goal is to create an alternative fitness app that caters to privacy-conscious fitness enthusiasts, offering health tracking without compromising user privacy.

Our aim is to make the application entirely local, storing our users' health data manually. The application will not collect any data from users without their knowledge, and users will have to input their fitness and health data manually. Users can pair the application with low-tech, wearable devices like a pedometer, which also do not require internet. The app will provide users with tools to analyze and visualize their data.

Overall, we aim to create an application that is transparent, user-friendly, and privacy-focused. This document outlines the architectural design decisions and models that will be implemented in the application.

## 1. System Purpose and Scope

The app is a fitness and health tracker that operates entirely offline, prioritizing user privacy. It allows users to manually input their fitness and health data, offering analysis tools without internet dependency. The app's scope includes the following features:

### 1. Consent Management
- Users will be prompted for explicit consent before disclosing health data
- Users will be asked consent to receive regular notifications for data import reminders and sleep cycle tracking.

### 2. Data Input
- App allows manual data input from various wearable devices (e.g., pedometers, heart rate monitors) and manual input of personal details such as age and weight.
- Users can be prompted to input sleep data for tracking their sleep cycle.
- Users can input exercise data such as walking/running distances.

### 3. Location Tracking
- With user consent, the system accesses location data to track walking/running distances and exercise activities.

### 4. Algorithmic Calculations
- Employing offline algorithms, the application can calculate calories burned using the collected data.

### 5. Privacy Features
- User-centric privacy is ensured through a visible button for easy access to the privacy policy.
- A dedicated section within the app educates users on the privacy implications of their choices, enhancing transparency.

#### Functional Boundaries
- The system's focus centers on health and fitness tracking, deliberately excluding features like social networking and extensive community building.
- It does not include advanced medical diagnostics including blood tests, ECG, temperature monitoring, blood oxygen levels, etc.


## 2. Similar Systems

Compared to existing fitness apps that rely on cloud-based data processing, our app stands out by processing and storing all data locally, significantly enhancing user privacy.

## 3. Functional Requirements

- **User Interface**:The user interface will be designed to be simple and intuitive, allowing the user to input their fitness and health data easily.
- **Data Storage**: The application will store the user's fitness and health data locally on their device. This data will not be shared with any third parties.
- **Data Analysis**: The application will provide the user with tools to analyze their fitness and health data. This will allow the user to gain insights into their health and fitness, without having to share their data with any third parties.
- **Consent Management**: The application will provide the user with clear and transparent information about what data is being collected and how it is being used. The user will have the ability to provide or withdraw consent for the collection and use of their data at any time.

## 4. Privacy Requirements

1. **Regulatory Compliance:**

   - The application will strictly adhere to the guidelines outlined in the **Personal Information Protection and Electronic Documents Act (PIPEDA)**, as mandated by the Canadian government.

2. **Explicit User Consent:**

   - Users will be prompted for explicit consent at each stage of data collection. The application will actively notify users about the implications of their choices within the app.

3. **Isolation from External Platforms:**

   - The application will remain isolated from social media platforms and will not integrate with third-party services. This intentional separation provides an isolated and private user experience without external data-sharing entities.

4. **Transparent Data Handling:**

   - The application will provide clear explanations when making decisions about data input or analysis tools to ensure understanding even to non-technical users.

5. **Dynamic Consent Management:**

   - Users will have a straightforward mechanism to withdraw consent at any point. This can be achieved through a dedicated interface, ensuring that users retain control over all data collection.

6. **Local Data Storage:**

   - To enhance security, fitness and health data will be stored locally on the user's device. Encryption techniques, such as **SQLCipher**, will be used.

7. **Limited Collection:**

   - The application commits to collecting only the data necessary for its intended purposes and functionalities. Only essential fitness and health metrics will be gathered, minimizing the risk associated with unnecessary data collection.

8. **Limited Use:**

   - Collected data will be strictly used for the specific purposes for which consent was obtained. This includes functionalities such as providing analysis tools without repurposing data for activities beyond the original user consent.

9. **Non-Disclosure and Ad-Free Environment:**
   - The application will not disclose any user data to third parties. Additionally, users will experience an ad-free environment within the application.

## 5. Stakeholders

We identify the key stakeholders to understand the perspectives and interests surrounding our alternative fitness application, to ensure that the application caters to the needs and concerns of various user groups. The main stakeholders include:

### 1. Privacy-Conscious Users:

- **Characteristics:**
  - Individuals with a heightened concern for the privacy of their personal health and fitness data.
- **Interests:**
  - Prioritize privacy features such as data handling transparency and limited data use and collection.
  - Avoid distribution and disclosure of their health data to third parties.
  - Seek assurance that their data is handled with confidentiality.
- **Expectations:**
  - Desire transparent communication regarding the application's privacy features.
  - Value control over data sharing and consent management.

### 2. Fitness Enthusiasts:

- **Characteristics:**
  - Users passionate about maintaining a healthy lifestyle through fitness activities.
- **Interests:**
  - Look for a reliable tool that accurately tracks and analyzes various health metrics.
  - Prioritize a user-friendly experience for both data input and interpretation.
- **Expectations:**
  - Expect intuitive and easy-to-use features for tracking and analyzing fitness data.
  - Value personalized insights that contribute to an improved fitness regimen.

### 3. App Developers:

- **Characteristics:**
  - The development team responsible for the creation of the application (us).
- **Interests:**
  - Focus on aligning the application with privacy regulations and standards.
  - Seek to provide a pleasant user experience while maintaining privacy.
- **Expectations:**
  - Prioritize user privacy and data security in the application's architecture.
  - Value user control and transparency in data handling within the application.

### 4. Privacy Advocates:

- **Characteristics:**
  - Individuals or organizations with a focus on safeguarding user privacy rights.
- **Interests:**
  - Monitor and evaluate applications to ensure they adhere to established privacy standards.
  - Advocate for transparent privacy practices and user rights.
- **Expectations:**
  - Expect detailed privacy policies and transparent communication from the application.
  - Value cooperation and responsiveness from the development team regarding privacy concerns.

### 5. Regulatory Authorities:

- **Characteristics:**
  - Entities responsible for overseeing and enforcing privacy regulations.
- **Interests:**
  - Ensure applications comply with legal requirements, such as PIPEDA in Canada.
  - Focus on safeguarding user privacy in accordance with established laws.
- **Expectations:**
  - Expect the application to align with national and regional privacy regulations.

## 6. Architectural Design Decisions and Models

- challenge of making it fast enough while still keeping all the data on hand
  Describes the app's architecture, focusing on components like the local database and analytics engine, and includes UML diagrams to illustrate the system's structure.

### Local Database (Storage Component)

- Technology Choice: Use SQLite or Realm for local storage. These databases are lightweight, can be embedded within the app, and don't require internet access, aligning with your privacy-first approach.  Android Studio supports the integration of both databases, offering tools and libraries that simplify working with these databases. For example, Room Persistence Library provides an abstraction layer over SQLite to enhance database access while still benefiting from SQLite's performance and reliability.

- Encryption: Use database encryption, like SQLCipher, to protect stored data. It is an open-source extension to SQLite that provides  256-bit AES encryption of database files.The goal is that even if the device is compromised, the fitness and health data remains secure. Any data written to the disk by SQLite or Realm can be fully encrypted, ensuring that user data remains secure even if the device is compromised. the cipher operates by encrypting the data before it's written to disk and decrypting it upon read, all transparently to the application. This means the application can interact with the database using standard SQL commands without needing to manage encryption and decryption explicitly. We can integrate it via Gradle dependencies and ensuring that the database instantiation uses SQLCipher’s encrypted database classes instead of the standard SQLite classes.

- Data Minimization principle: We aim to store only the data necessary for the app's functionality. This minimizes the risk in case of unauthorized access.This principle is a core tenet of privacy by design and is especially important in our case as we deal with sensitive data.
Here is a list of the data that we expect to store for a user:

 **User Profile Data**

- **Username or ID**
- **Age**
- **Gender** 
- **Height and Weight** 
- **Fitness Goals**

**Health Metrics**

- **Daily Steps**
- **Heart Rate**
- **Blood Pressure**
- **Sleep Patterns**
- **Calories Consumed**
- **Calories Burned**
- **Water Intake**

**Fitness Activity Data**

- **Workout Logs**
- **Personal Records**

- **App Settings and Preferences**
- **Data Sharing Preferences**
- **Notification Preferences**



### Analytics Engine (Data Analysis Component)

This part is responsible for processing and analyzing user-inputted health and fitness data. We want it to deliver personalized insights and recommendations while ensuring utmost data privacy and security. This component processes local data to avoid any external data exposure, the challenge is to make it fast enough to ensure user friendly usage.

#### Key Algorithms and Computations

1. **Trend Analysis**: Utilizes statistical methods to identify patterns over time in the user's data. For steps and heart rate data, we apply a moving average filter to smooth out short-term fluctuations and highlight longer-term trends.

   Formula Example: \(MA_t = \frac{1}{N} \sum_{n=0}^{N-1} x_{t-n}\), where \(MA_t\) is the moving average at time \(t\), \(N\) is the number of periods in the average, and \(x_t\) is the input value at time \(t\).

2. **Calorie Burn Estimation**: Employs the Metabolic Equivalent of Task (MET) values for various activities, combined with user data such as weight and duration of activity, to estimate calories burned.

   Formula: \(Calories Burned = MET \times Weight (kg) \times Duration (hours)\).

3. **Sleep Quality Assessment**: Analyzes sleep pattern data, including total sleep time and restlessness, to provide insights into sleep quality. Uses algorithms to classify sleep stages based on movement and heart rate variability data.

#### Implementation

- **Local Machine Learning Models**: For personalized insights, TensorFlow Lite is used to run pre-trained models directly on the device. These models are designed to be lightweight and efficient, suitable for mobile devices with limited computing resources.

- **User Control and Transparency**: Users have the option to select which data points are included in the analysis, respecting their privacy preferences. The app provides clear explanations of how data is used to generate insights.


User Interface (UI Component)

Consent Management Module

## 7. Important Scenarios

Details scenarios relevant to privacy, such as data consent withdrawal, illustrated through sequence diagrams or plain text descriptions.

## 8. Conclusion

Summarizes the architectural approach and its emphasis on privacy, highlighting the app's commitment to user control over personal data.

## Footnotes
 https://www.zetetic.net/sqlcipher/