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
   - The application will strictly adhere to the guidelines outlined in the **Personal Information Protection and Electronic Documents Act (PIPEDA)**, as mandated by the Canadian government.

2. **Privacy by Design:**
   - The application's architecture embodies privacy by design principles through features such as local storage and manual data input. This approach ensures that user privacy is prioritized from the outset.

3. **Explicit User Consent:**
   - Users will be prompted for explicit consent at each stage of data collection. The application will actively notify users about the implications of their choices within the app.

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

10. **Isolation from External Platforms:**
    - The application will remain isolated from social media platforms and will not integrate with third-party services. This intentional separation provides an isolated and private user experience without external data-sharing entities.


## 5. Stakeholders

We identify the key stakeholders to understand the perspectives and interests surrounding our alternative fitness application, to ensure that the application caters to the needs and concerns of various user groups. The main stakeholders include:

1. **Privacy-Conscious Users:**
   - Individuals who prioritize the confidentiality of their fitness and health data.
   - Concerned about data security and appreciate a privacy-centric application.

2. **Fitness Enthusiasts:**
   - Users passionate about fitness, seeking a reliable tool to track and analyze their health metrics.
   - Interested in a seamless and user-friendly experience for inputting and interpreting fitness data.

3. **Healthcare Professionals:**
   - Medical practitioners or researchers interested in leveraging secure data sharing for health analysis.
   - Value the potential insights provided by fitness and health data for monitoring patient well-being.

4. **App Developers and Maintainers:**
   - The team responsible for the development, maintenance, and updates of the Alternative Fitness App.
   - Focused on ensuring the application aligns with privacy regulations and user expectations.

5. **Wearable Pedometer Manufacturers:**
   - Companies producing wearable devices compatible with the application.
   - Interested in integration and compatibility to enhance the user experience.

6. **Privacy Advocates:**
   - Individuals or organizations advocating for user privacy rights.
   - Monitor and assess the app's adherence to privacy standards.

7. **Regulatory Authorities:**
   - Entities responsible for overseeing and enforcing privacy regulations.
   - Ensure the application complies with legal requirements, such as PIPEDA in Canada.


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


