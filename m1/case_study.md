# Smart Health Devices Privacy Impact Report: A Case Study on Fitbit

## Table of Contents

1. [Introduction](#1-introduction)
   - Project Overview
   - Objectives
   - Scope of the Study
2. [Research Methods](#2-research-methods)
   - Technical Literature Review
   - Literature Search
   - Privacy Notices Review
3. [Results](#3-results)
   - Data Collection Practices
   - Identified Privacy Threats and Their Causes
   - Comparative Analysis of Privacy Policies and Actual Data Handling Practices
   - PIPEDA Compliance
4. [Conclusions](#4-conclusions)
   - Summary of Key Findings
   - Implications for Privacy and Policy
   - Recommendations for Future Research
5. [Appendix](#5-appendix)
   - Detailed Data Sets
   - Technical Documentation
   - Survey Instruments and Results
6. [References](#6-references)

# Smart Health Devices Privacy Impact Report: A Case Study on Fitbit

## 1. Introduction

### 1.2 Project Overview

In our case study, we decided to focus on the privacy impact and implications of modern smart health devices. Specifically, we focused on Fitbit, as it is one of the leading companies among the smart health devices sector, and it is present since 2007. The immense amount of data Fitbit collects, as well as the recent acquisition of the company by Google are both interesting aspects to look into in terms of what they mean for user privacy.

### 1.2 Objectives

- To research and understand the history of the Fitbit devices, and the most impactful transition when Fitbit devices started to become a privacy issue.
- Understand the current privacy policy of Fitbit and its implications for the users, as well as its compliance with PIPEDA.
- Understand the implications of the Google's acquisition of Fitbit.
- Discuss how a user can use their Fitbit device better in terms of data privacy.

### 1.3 Scope of the Study

- We used technical literature review, literature search, and privacy notices review methods in our research.
- We compared the current privacy policy of Fitbit to PIPEDA and spotted the compliance issues.
- We studied the current and future privacy implications of Fitbit devices.

## 2. Research Methods

### 2.1 Technical Literature Review

In our research, we focus on gathering and examining the latest official documents from Fitbit and Google to examine technical details about how they handle user data. This step is crucial because it helps us build a clear picture of Fitbit's privacy rules, especially after Google's aquisition. We looked closely at these documents to figure out exactly what kind of user information they collect, how they use this data, and who else might get access to it. Our main goal is to dig into these policies to see if Fitbit follows privacy regulations and how open/transparent they are about their data practices with users.

### 2.2 Literature Search

To broaden our outlook, we looked into more than just the official documentation. We also explored recent studies, tech reports, and news that talked about how Fitbit handles privacy. Our main goal is to find out what kind of privacy problems, security leaks, or worries people have about Fitbit. This step was about getting the full picture of Fitbit's privacy from different angles – what experts say, what's in the news, and what users think. This way, we could really understand how Fitbit's privacy rules work in the real world and what the implications are for people using their product.

### 2.3 Privacy Notices Review

Our research methodology involves an in-depth review of Fitbit's privacy practices under Google. This involves a thorough analysis of their extensive documentation, which includes privacy policies and terms of service for both Fitbit and Google. Specifically, we analyze the policies and terms of service to understand the extent of data collection, the purposes for such collection, and the sharing of such information with third parties. The documentation also provides insights into managing personal information, with details on how users can access, limit, and control their data. Given the complexity of the documentation, we also consider the implications of the language used in the privacy policies and terms of service, and how it may affect users' understanding of their privacy rights. PIPEDA compliance is also a key focus of our research, as we aim to understand how Fitbit's privacy practices align with Canadian privacy laws.

## 3. Results

### 3.1 Data Collection Practices

Our investigation into Fitbit’s data practices uncovered a startling reality: the device collects an extensive range of personal information, encompassing everything from your daily movements and sleep habits to precise location data. The depth and breadth of the data captured by Fitbit are alarming. It’s not just about counting steps or monitoring sleep; it’s a comprehensive digital footprint of our lifestyles and habits. 

Data is collected even before users start using their devices. New Fitbit users must either sign-in with a pre-existing Google account or create a new one. This means that users are immediately surrendering their name, birthday, gender, and email. New Google accounts also record Web/App activity, Google Maps timeline, and YouTube history by default. Personalized advertisement and personalized search results are also turned on by default. 

For users that already have a Google account, all the information that is previously associated with their account can now be aggregated with data that Fitbit will collect. 

This includes:
-	phone numbers
-	payment information
-	emails
-	photos and videos
-	docs and spreadsheets
-	purchases
-	contacts
-	activity on third-party sites/apps
-	phone calls and associated information

Google/Fitbit also collect location information about its users such as GPS and sensor data, IP addresses, Wi-Fi access points, cell towers and information about Bluetooth devices. 

More information about Google’s data collection practices is available on their [Privacy and Terms](https://policies.google.com/privacy?hl=en-US#infocollect) webpage. 

After users sign into their Google accounts, they must set up the Fitbit app. Here, users are required to provide their height, weight, and sex. If they choose to, users can also provide a profile picture, biography, logs for food, sleep, water, etc. as stated in [Fitbit’s Privacy Policy](https://www.fitbit.com/global/en-ca/legal/privacy-policy#info-we-collect). 

There is also data that is collected just from using their service. This includes device information (steps, distance, calories burned, heart rate, active minutes, location, and more), geolocation, and usage information. Usage information is information about how a user interacts with the Fitbit service (interactions with the app, pairing a device, logging into the Fitbit website). Fitbit says they track IP addresses, browser type, language, operating system, referring web page, pages visited, location, and cookie information.

After experimenting with logging into the Fitbit website on a computer and navigating to our personal dashboard, we found two trackers **doubleclick.net** and **c.betrad.com**. Further investigation into c.betrad.com’s [tag.js](https://c.betrad.com/pub/tag.js) script shows that the script is responsible for dropping a tracking pixel on the website (references to *formatPixelUrl* and *dropPixel*).

Fitbit can also receive information about its users from third parties and can also partner with third parties such as employers or insurance companies.

More information about Fitbit's data collection can be found [here](https://www.fitbit.com/global/en-ca/legal/privacy-policy#info-we-collect).

### 3.2 Identified Privacy Threats and Their Causes
As we can see from the timeline of the Fitbit devices [^4] since the company's inception at 2007, every new device coming into the market meant more data collection from the users. The first Fitbit Device started off as a simple offline pedometer that the user could clip onto their t-shirt and with an accompanying website that allowed them to keep track of their step counts. However, the newest model tracks is equipped with countless sensors. It can track the user's heart rate, heart rhythm, breathing rate, skin temperature, blood oxygen levels, stress levels, sleep time and sleep stages. In addition, it has built-in support for Google Maps, Google Wallet and YouTube Music. It can send and receive call,text and app notifications and allow you to contactlessly pay. Even though some of these features do add conveniency to the user's life, it should not be forgotten that the device collects an immense amount of very sensitive health data, and even this in itself, is a privacy threat. 

Fitbit has a dedicated device for kids: Fitbit Ace. What is different about this dedicated device is that, its features and sensors are very limited, compared to the normal adult devices. Fitbit Ace only tracks the user's activity (steps, stairs, distance etc.) and sleep amount. It can also still pair with a phone and receive and send notifications. A special feature of this kids' device is that it allows the parents to control their kid's account through a feature called Family Account. The parent is able to see all their kid's activity that is collected through their Fitbit through this account, and they can control their privacy settings. Once the child turns 13, they are eligible to take over their account and not allow the parental account. Even though the fact that the kids version of the Fitbit device doesn't collect many of the sensitive information the adult version controls, it is important to note that it still collects some, like age, weight, height and activity levels. Also, it still has most of the privacy concerns and PIPEDA compliance issues of the adult version, which we will discuss in section 3.4

Another important thing to note that, all new users need a Google account to use their Fitbit devices. And users who already had a Fitbit device and account before the acquisition by Google can choose to use their Fitbit account until 2025, and after that they will also be required to have a Google account. 

### 3.3 Comparative Analysis of Privacy Policies and Actual Data Handling Practices

### 3.4 PIPEDA Compliance

A thorough examination of Fitbit's privacy policies reveals that the company is not in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA). Further analysis suggests that Fitbit is able to exploit the ambiguous language and inadequate definitions in PIPEDA.

While PIPEDA is designed to ensure the privacy rights of individuals, Fitbit appears to capitalize on the absence of strict definitions in PIPEDA to collect and profit from their users' personal information while maintaining the semblance of legal compliance.

An analysis of PIPEDA Principles in relation to Fitbit's privacy policies is as follows:

#### 1. Accountability

The Accountability Principle, first and foremost, requires that companies "comply with all 10 fair information principles." [pipeda](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_accountability/) Fitbit does not comply with all 10 fair information principles, as will be demonstrated in the following sections.

According to Principle 1, companies should also "identify your organization’s designated privacy official, and communicate that person’s name or title internally and externally (e.g. on your website or in publications)."[pipeda](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_accountability/) Fitbit's privacy policy does not identify a designated privacy official to whom users can direct their privacy concerns. Further investigation reveals that Google, Fitbit's parent company, does not have a designated privacy official either. There is also no way of knowing if Fitbit "provides adequate privacy training to [their] employees" as required by Principle 1.

Now, consider the following requirement:

"Protect all personal information held by your organization, including any personal information you transfer to a third party for processing" - PIPEDA Fair Information Principle 1 – Accountability [pipeda](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_accountability/)

Ironically, Fitbit's User Data and Developer Policy [cool](https://dev.fitbit.com/legal/fitbit-user-data-and-developer-policy/) is (mostly) in compliance with PIPEDA's principles, while their own privacy policy is not. Notably, "Transferring or selling user data to third parties like advertising platforms, data brokers, or any information resellers even if aggregated or anonymized" is prohibited by Fitbit's User Data and Developer Policy. This is not the case with their own privacy policy, which states: "We work with partners who provide us with analytics and advertising services".

#### 2. Identifying Purposes

The Identifying Purposes Principle requires companies to "identify and document [their] purposes for collecting personal information". Notice that this does not mean that companies must disclose their purposes to the public. 

"Tell your customers why your organization needs their personal information before or at the time of collection." - PIPEDA Fair Information Principle 2 – Identifying Purposes [pipeda](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_purposes/)

Observe that the lack of specificity. PIPEDA only requires that companies give their customers a reason for collecting personal information, not that the reason needs to be specific or detailed. Without a clear definition of what constitutes a valid disclosure, Fitbit is essentially able to collect any personal information under this principle without having to disclose to its users the detailed information about the purposes for which their personal information is collected. This is seen in practice when Fitbit states, in their privacy policy, that they collect personal information for the purposes of providing their 'Services' (defined by Fitbit as "devices, applications, software, websites, APIs, products, and services"). This statement is so vague that it is essentially meaningless, and does not provide users with a clear understanding of the purposes for which their personal information is collected.

#### 3. Consent

Fitbit's privacy policy states that it collects personal information for the purposes of providing its 'Services': "We work with partners who provide us with analytics and advertising services. This includes helping us understand how users interact with the Services"[^1]. This is a broad statement that does not clearly define the purposes for which personal information is collected.

Considering that PIPEDA's Fair Information Principle 3 requires that organizations "only collect, use or disclose personal information for purposes that a reasonable person would consider appropriate under the circumstances"[^2], Fitbit's data collection would not be accordance with this principle; most customers would not consider the collection of personal information for the purposes of advertising and marketing to be appropriate.

Furthermore, usage of vague language and contradiction in Fitbit's privacy policy makes it difficult for users to make informed choices. For example, the policy states: "We never sell the personal information of our users. We do work with partners who provide us with advertising services". This is a contradiction that seemingly attempts to take advantage of the fact that many users may not understand the difference between selling personal information and sharing it with third parties for advertising purposes.

"People must understand what they are consenting to. It is only considered valid if it is reasonable to expect that your customers will understand the nature, purpose and consequences of the collection, use or disclosure of their personal information." - PIPEDA Fair Information Principle 3 – Consent[^2]

Fitbit can not claim to have obtained "meaningful consent" from its users as required by PIPEDA, because it has not clearly defined the purposes for which personal information is collected, and has not provided clear and understandable information about the sharing of personal information with third parties.

#### 4. Limiting Collection

"Limit the amount and type of information you collect to what is needed for the identified purposes" - PIPEDA Fair Information Principle 4 – Limiting Collection[^3]

Fitbit collects an excessive amount of personal information from its users. The requirement for a Google account to set up a device means that new Fitbit users are subject to Google's data collection practices. These practices are extensive and include web and app activity, map timeline, and YouTube history, among others, which are not necessary for the operation of a Fitbit device. They are further able to collect personal information for "identified purposes" such as (but not limited to) advertising, marketing, and analytics. In theory, Fitbit should not be able to collect user data for purposes that are not essential to the functionality of its devices under the Fair Information Principle.

However, consider the wording of PIPEDA's Fair Information Principle 4:

"Collect only the personal information your organization needs to fulfill a legitimate identified purpose." - PIPEDA Fair Information Principle 4 – Limiting Collection[^3]

Fitbit's privacy policy states that it only collects personal information that is necessary for the operation of its devices and essential 'Services'. However, these 'Services' inlude advertising and marketing, and the sharing of personal information with third parties such as advertisers and business partners. Because of vagueness in PIPEDA and a lack of definition of what constitutes "legitimate", Fitbit is able to collect more personal information than functionally necessary, and share it with third parties under the guise of fulfilling a "legitimate identified purpose".

#### 5. Limiting Use, Disclosure, and Retention

"Obtain fresh consent if you intend to use or disclose personal information for a new purpose ... Collect, use or disclose personal information only for purposes that a reasonable person would consider appropriate in the circumstances." [PIPEDA Fair Information Principle 5 – Limiting Use, Disclosure, and Retention](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_use/)

Fitbit, through Google, does not obtain fresh, meaningful consent from users when it collects new personal information or implements new uses of personal information. Google's method of informing users of changes to its privacy policy is to send emails to users, which does not meet the more stringent requirements of PIPEDA for obtaining meaningful consent as described in principle 3.

Further, PIPEDA requires that user information must only be used for purposes that a reasonable person would consider appropriate in the circumstances, which, while a subjective standard, allows some flexibility for companies to use user information in ways that are not strictly necessary for the operation of their services. However, despite this flexibility, Fitbit's collection and use of personal data for advertising and marketing purposes, as well as their inconsistent privacy policies, overstep the bounds PIPEA sets for what is appropriate and are therefore not in compliance with principle 5.

In terms data retention, Fitbit complies well enough according to their [data retention policy](https://support.google.com/product-documentation/answer/13532616?hl=en#zippy=%2Cwhat-retention-periods-apply-to-my-data). Data used for watch and app features are retained indefinitely, and other data is retained only as long as is legally necessary, although they also add a clause that it may be retained for "legitamate business purposes". This statement is vague, but does not provide enough information to determine that this is a PIPEDA violation.

#### 6. Accuracy

#### 7. Safeguards

#### 8. Openness

Fitbit's privacy policy is not open and transparent. It is vague and contradictory, and does not clearly define the purposes for which personal information is collected, used, and disclosed to third parties.

To use the language of PIPEDA, Fitbit's privacy policy is not "easily understandable" and "easily available" to its users as required by PIPEDA's Fair Information Principle 8 – Openness. [PIPEDA Fair Information Principle 8 – Openness](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_openness/)

Further consider the following PIPEDA requirement that Fitbit is not in compliance with:
"Consumers find privacy policies are difficult to understand, yet they feel compelled to give their consent in order to obtain the goods and services they want." - [PIPEDA Fair Information Principle 8 – Openness](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_openness/)

In fact, Fitbit's Privacy Policies and Terms of Service are sprawled across 8 different web pages, and are not easily accessible from the Fitbit website. [hehehaha](m1/fitbit_privacy_policies.md)

This makes it difficult for non-technical users to navigate. Even if a user were to find and read all of Fitbit's privacy policies, they would find that it is (as mentioned in previous section) vague and contradictory, and does not define the extent for which personal data is collected, used, and disclosed to third parties. This obfuscation is likely intentional; Fitbit does not want its users to understand the full extent of its data collection and sharing practices, as Google relies on the collection of personal information for its advertising and marketing services. Knowledge of the full extent of Fitbit's data collection and sharing practices would likely deter many users from using Fitbit devices and services.

#### 9. Individual Access

#### 10. Challenging Compliance

#### _Sources_

// I'm leaving these unfinished for now, will put the rest in later
[^1]: [Fitbit Privacy Policy](https://www.fitbit.com/global/en-ca/legal/privacy-policy#analytics-and-advertising)
[^2]: [PIPEDA Fair Information Principle 3 – Consent](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_consent/)
[^3]: [PIPEDA Fair Information Principle 4 – Limiting Collection](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_collection/)
[^4]: [History of Fitbit and Fitbit Products](https://www.verizon.com/articles/Accessories/history-of-fitbit/)

## 4. Conclusions

### 4.1 Summary of Key Findings

### 4.2 Implications for Privacy and Policy

The acquisition of Fitbit by Google, valued at $2.1 billion, not only marks a significant move into the health technology arena but also ignites substantial privacy and competitive concerns. Despite Google's assurance that Fitbit's health data won't be used for advertising purposes, the broader implications for such data within Google's extensive ecosystem remain unclear. The requirement for a Google account for Fitbit's operation weaves users' health information more closely into Google's data network, sparking debates over transparency and control over personal data. This development has attracted attention from both regulatory bodies and privacy advocates, highlighting worries about user privacy and the potential stifling of market competition. The melding of detailed health information with Google's analytical prowess necessitates a thorough reevaluation of privacy standards in the burgeoning digital health landscape.

Fitbit's partnerships with health insurance companies raise significant privacy concerns, potentially affecting health insurance premiums based on personal data like steps, heart rate, and sleep patterns. This intersection of health monitoring with insurance policies blurs the boundaries between enhancing health support and financial motivations, leading to critical questions about the true beneficiaries of health data. It highlights a concerning trend towards commodifying personal health information for financial gain, rather than focusing on user health and privacy, thus risking discrimination and privacy invasion.

Technological Advancements and Data Collection: The continuous advancement in wearable technology promises enhanced health monitoring capabilities. However, these developments also pose privacy concerns regarding the extent of data collection. Future versions of devices by fitbit could monitor increasingly sensitive and personal health metrics, collecting data that could reveal even more intimate details about a user's lifestyle, health conditions, and habits. The perspective of such comprehensive data collection increases the need for stricter privacy protection and ethical considerations in the use of bodily health monitoring technologies.

### 4.3 Recommendations for Future Research

## 5. Appendix

- Detailed Data Sets
- Technical Documentation
- Survey Instruments and Results

## 5. References
