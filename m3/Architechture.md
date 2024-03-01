# Alternative Fitness App: Privacy-First Architecture Design

Due to privacy concerns with the Fitbit API, we have decided to create an alternative application which tracks fitness and health data while prioritizing user privacy.

The architecture design of our application is based on the principles of privacy by design. We aim to create an application that is entirely local and does not require an internet connection. This means that the application will not collect any data from the user, and the user will have to input their fitness and health data manually. Users will pair the application with a wearable pedometer that does not require an internet connection, and enter their fitness and health data manually into the application. 

The application will provide the user with tools to analyze their fitness and health data, and will not share any data with third parties. No advertisements will be displayed in the application.

## 1. System Purpose and Scope

The app is a fitness and health tracker that operates entirely offline, prioritizing user privacy. It allows users to manually input their fitness and health data, offering analysis tools without internet dependency. 

## 2. Similar Systems

Compared to existing fitness apps that rely on cloud-based data processing, our app stands out by processing and storing all data locally, significantly enhancing user privacy.

## 3. Functional Requirements

- **User Interface**:The user interface will be designed to be simple and intuitive, allowing the user to input their fitness and health data easily.
- **Data Storage**: The application will store the user's fitness and health data locally on their device. This data will not be shared with any third parties.
- **Data Analysis**: The application will provide the user with tools to analyze their fitness and health data. This will allow the user to gain insights into their health and fitness, without having to share their data with any third parties.
- **Consent Management**: The application will provide the user with clear and transparent information about what data is being collected and how it is being used. The user will have the ability to provide or withdraw consent for the collection and use of their data at any time.

## 4. Privacy Requirements

1. **Regulatory Compliance:**
   - The application will adhere to the guidelines set forth by PIPEDA, as mandated by the Canadian government.

2. **Privacy by Design:**
   - The application will integrate principles of privacy by design, prioritizing user privacy and data protection as fundamental aspects of the system architecture.

3. **Explicit User Consent:**
   - No data will be collected from users without their explicit consent.
   - Users will be prompted for consent at each stage before any data collection occurs.

4. **Transparent Data Handling:**
   - Clear and transparent communication to users about the nature of data being collected and how it will be utilized.
   - Users will be notified about the implications of every choice they make in the app.
   - The privacy policy will be easily accessible and understandable to non-technical users.

5. **Dynamic Consent Management:**
   - Users will have the ability to provide or withdraw consent for data collection and usage at any point.
   - The application will immediately delete user data upon their request.

6. **Local Data Storage:**
   - Fitness and health data will be stored locally on the user's device, ensuring users maintain full control over their personal information.

7. **Limited Collection:**
   - The application will only collect data that is strictly necessary for the intended purpose and functionalities. It will refrain from unnecessary data collection.

8. **Limited Use:**
   - Collected data will only be used for the specific purposes for which consent was obtained.
   - Data will not be repurposed for activities beyond the original user consent.

9. **Non-Disclosure and Ad-Free Environment:**
   - The application will not share any user data with third parties.
   - No advertisements will be displayed within the application.

10. **Isolation from External Platforms:**
    - The application will not integrate with social media platforms.
    - No integrations with third-party services will be present to ensure an isolated and secure user experience.

## 5. Stakeholders

Identifies key stakeholders including privacy-conscious users, fitness enthusiasts, and healthcare professionals interested in secure data sharing.

## 6. Architectural Design Decisions and Models
- challenge of making it fast enough while still keeping all the data on hand
Describes the app's architecture, focusing on components like the local database and analytics engine, and includes UML diagrams to illustrate the system's structure.

Local Database (Storage Component)

- Technology Choice: Use SQLite or Realm for local storage. These databases are lightweight, can be embedded within the app, and don't require internet access, aligning with your privacy-first approach. https://www.zetetic.net/sqlcipher/
- Encryption: Use database encryption, like SQLCipher, to protect stored data.So that even if the device is compromised, the fitness and health data remains secure.
- Data Minimization principle: Store only the data necessary for the app's functionality. This minimizes the risk in case of unauthorized access.


Analytics Engine (Data Analysis Component)

User Interface (UI Component)

Consent Management Module

## 7. Important Scenarios

Details scenarios relevant to privacy, such as data consent withdrawal, illustrated through sequence diagrams or plain text descriptions.

## 8. Conclusion

Summarizes the architectural approach and its emphasis on privacy, highlighting the app's commitment to user control over personal data.

## Footnotes


