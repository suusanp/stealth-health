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


- The application will follow PIPEA guidelines, as well as the principles of privacy by design.

- The application must not collect any data from the user without their explicit consent.

- The application must clearly and transparently inform the user about what data is being collected and how it is being used.

- The user must have the ability to provide or withdraw consent for the collection and use of their data at any time.

- The application must store the user's fitness and health data locally on their device, and this data must not be shared with any third parties.

- The user interface must be designed to be simple and intuitive, allowing the user to input their fitness and health data easily.

- The application will not share any data with third parties, and will not display any advertisements.

## 5. Stakeholders

Identifies key stakeholders including privacy-conscious users, fitness enthusiasts, and healthcare professionals interested in secure data sharing.

## 6. Architectural Design Decisions and Models
- challenge of making it fast enough while still keeping all the data on hand
Describes the app's architecture, focusing on components like the local database and analytics engine, and includes UML diagrams to illustrate the system's structure.

## 7. Important Scenarios

Details scenarios relevant to privacy, such as data consent withdrawal, illustrated through sequence diagrams or plain text descriptions.

## 8. Conclusion

Summarizes the architectural approach and its emphasis on privacy, highlighting the app's commitment to user control over personal data.

## Footnotes


