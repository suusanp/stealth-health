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

In our case study, we decided to focus on the privacy impact and implications of modern smart health devices. Specifically, we focused on Fitbit, as it is one of the leading companies among the smart health devices sector, and it is present since 2007. The immense amount of data Fitbit collects, as well as the recent acquisition of the company by Google are both interesting aspects to investigate in terms of what they mean for user privacy.

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

### 2.1 Literature Search

To broaden our outlook, we looked into more than just the official documentation. We also explored recent studies, tech reports, and news that talked about how Fitbit handles privacy. Our main goal is to find out what kind of privacy problems, security leaks, or worries people have about Fitbit. This step was about getting the full picture of Fitbit's privacy from different angles – what experts say, what's in the news, and what users think. This way, we could really understand how Fitbit's privacy rules work in the real world and what the implications are for people using their product.

### 2.2 Privacy Notices Review

In our research, we focus on gathering and examining the latest official documents from Fitbit and Google to examine technical details about how they handle user data. Our methodology involves an in-depth review of Fitbit's privacy practices under Google. This involves a thorough analysis of their extensive documentation, which includes privacy policies and terms of service for both Fitbit and Google. Specifically, we analyze the policies and terms of service to understand the extent of data collection, the purposes for such collection, and the sharing of such information with third parties, as well as their level of transparency with users. The documentation also provides insights into managing personal information, with details on how users can access, limit, and control their data. Given the complexity of the documentation, we also consider the implications of the language used in the privacy policies and terms of service, and how it may affect users' understanding of their privacy rights. PIPEDA compliance is also a key focus of our research, as we aim to understand how Fitbit's privacy practices align with Canadian privacy laws.

## 3. Results

### 3.1 Data Collection Practices

Our investigation into Fitbit’s present day data practices uncovered a startling reality: the device collects an extensive range of personal information, encompassing everything from your daily movements and sleep habits to precise location data. The depth and breadth of the data captured by Fitbit are alarming. It’s not just about counting steps or monitoring sleep; it’s a comprehensive digital footprint of our lifestyles and habits.

Data is collected even before users start using their devices. New Fitbit users must either sign-in with a pre-existing Google account or create a new one. This means that users are immediately surrendering their name, birthday, gender, and email. New Google accounts also record Web/App activity, Google Maps timeline, and YouTube history by default. Personalized advertisement and personalized search results are also turned on by default.

For users that already have a Google account, all the information that is previously associated with their account can now be aggregated with data that Fitbit will collect.

This includes:

- phone numbers
- payment information
- emails
- photos and videos
- docs and spreadsheets
- purchases
- contacts
- activity on third-party sites/apps
- phone calls and associated information

Google/Fitbit also collect location information about its users such as GPS and sensor data, IP addresses, Wi-Fi access points, cell towers and information about Bluetooth devices.

More information about Google’s data collection practices is available on their [Privacy and Terms](https://policies.google.com/privacy?hl=en-US#infocollect) webpage.

After users sign into their Google accounts, they must set up the Fitbit app. Here, users are required to provide their height, weight, and sex. If they choose to, users can also provide a profile picture, biography, logs for food, sleep, water, etc. as stated in [Fitbit’s Privacy Policy](https://www.fitbit.com/global/en-ca/legal/privacy-policy#info-we-collect).

There is also data that is collected just from using their service. This includes device information (steps, distance, calories burned, heart rate, active minutes, location, and more), geolocation, and usage information. Usage information is information about how a user interacts with the Fitbit service (interactions with the app, pairing a device, logging into the Fitbit website). Fitbit says they track IP addresses, browser type, language, operating system, referring web page, pages visited, location, and cookie information.

After experimenting with logging into the Fitbit website on a computer and navigating to our personal dashboard, we found two trackers **doubleclick.net** and **c.betrad.com**. Further investigation into c.betrad.com’s [tag.js](https://c.betrad.com/pub/tag.js) script shows that the script is responsible for dropping a tracking pixel on the website (references to _formatPixelUrl_ and _dropPixel_).

Fitbit can also receive information about its users from third parties and can also partner with third parties such as employers or insurance companies.

More information about Fitbit's data collection can be found [here](https://www.fitbit.com/global/en-ca/legal/privacy-policy#info-we-collect).

### 3.2 Identified Privacy Threats and Their Causes
As we can see from the timeline of the Fitbit devices [^4] since the company's inception in 2007, every new device coming into the market meant more data collection from the users. The [first Fitbit Device](https://spectrum.ieee.org/the-consumer-electronics-hall-of-fame-fitbit) started off as a simple offline pedometer that the user could clip onto their t-shirt and with an accompanying website that allowed them to keep track of their step counts. The privacy threats of the original Fitbit were in some ways lower than today, but there are still some issues we can think of. A first privacy threat would be losing/misplacing a Fitbit or having a Fitbit device stolen. Someone could access a user's step data, and this could reveal information about their activity level, health, or fitness goal. Having to manually plug into a computer to transfer user data allowed users to have control over when and if they wanted to share their data with Fitbit, which was a good thing. However, once the data was uploaded to Fitbit's website, there was the privacy threat of how Fitbit was using and protecting users' data.  

The first-generation Fitbit's capabilities are a stark contrast with newer models equipped with countless sensors and increased data collection seen in section [3.1](#31-data-collection-practices). It can track the user's heart rate, heart rhythm, breathing rate, skin temperature, blood oxygen levels, stress levels, sleep time and sleep stages. In addition, it has built-in support for Google Maps, Google Wallet and YouTube Music. It can send and receive call, text and app notifications and allow you to contactlessly pay. Even though some of these features do add conveniency to the user's life, it should not be forgotten that the device collects an immense amount of very sensitive health data, and even this in itself, is a privacy threat. 

Fitbit has a dedicated device for kids: Fitbit Ace. What is different about this dedicated device is that its features and sensors are very limited, compared to the normal adult devices. Fitbit Ace only tracks the user's activity (steps, stairs, distance etc.) and sleep amount. It can also still pair with a phone and receive and send notifications. A special feature of this kids' device is that it allows the parents to control their kid's account through a feature called Family Account. The parent can see all their kid's activity that is collected through their Fitbit through this account, and they can control their privacy settings. Once the child turns 13, they are eligible to take over their account and not allow the parental account. Even though the fact that the kids' version of the Fitbit device doesn't collect many of the sensitive information the adult version controls, it is important to note that it still collects some, like age, weight, height and activity levels. Also, it still has most of the privacy concerns and PIPEDA compliance issues of the adult version, which we will discuss in section 3.4.

Another important thing to note that, all new users need a Google account to use their Fitbit devices. And users who already had a Fitbit device and account before the acquisition by Google can choose to use their Fitbit account until 2025, and after that they will also be required to have a Google account.

### 3.3 Comparative Analysis of Privacy Policies and Actual Data Handling Practices

### 3.4 PIPEDA Compliance

A thorough examination of Fitbit's privacy policies reveals that the company is not in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA). Further analysis suggests that Fitbit is able to exploit the ambiguous language and inadequate definitions in PIPEDA.

While PIPEDA is designed to ensure the privacy rights of individuals, Fitbit appears to capitalize on the absence of strict definitions in PIPEDA to collect and profit from their users' personal information while maintaining the semblance of legal compliance.

An analysis of PIPEDA Principles in relation to Fitbit's privacy policies is as follows:

#### 1. Accountability

The Accountability Principle, first and foremost, requires that companies "comply with all 10 fair information principles." [^1] Fitbit does not comply with all 10 fair information principles, as will be demonstrated in the following sections.

According to Principle 1, companies should also "identify your organization’s designated privacy official and communicate that person’s name or title internally and externally."[^20] Fitbit's privacy policy does not identify any individual by name as their designated privacy official. Further investigation reveals that Google, Fitbit's parent company, does not have a designated privacy official either. There is also no way of knowing if Fitbit "provides adequate privacy training to [their] employees" as required by Principle 1. 

However, Fitbit does have a [Data Protection Officer](https://www.fitbit.com/global/en-ca/legal/privacy-policy#contact-us) that users can contact with privacy concerns. I've tried to contact the DPO at data-protection-office@fitbit.com about my concerns with user consent, data use (especially in regards to advertising), and details of what constitutes "analytics" under ["analytics and advertising service provided by others"](https://www.fitbit.com/global/en-ca/legal/privacy-policy#analytics-and-advertising), but they have not responded to my inquiries as of February 16, 2023.

It is interesting to note that Google does not provide a unified way to contact their DPO. I have found one page for [Google Workplace](https://knowledge.workspace.google.com/kb/contact-google-data-protection-officer-000007916), but not for any other Google services.

Ironically and interestingly, Fitbit strictly follows the requirement to protect PII transferred to third parties for processing[^12]. Fitbit's User Data and Developer Policy [cool](https://dev.fitbit.com/legal/fitbit-user-data-and-developer-policy/) is (mostly) in compliance with PIPEDA's principles, while their own privacy policy is not. Notably, "Transferring or selling user data to third parties like advertising platforms, data brokers, or any information resellers even if aggregated or anonymized" is prohibited by Fitbit's User Data and Developer Policy. This is not the case with their own privacy policy, which states: "We work with partners who provide us with analytics and advertising services".

#### 2. Identifying Purposes

The Identifying Purposes Principle requires companies to "identify and document [their] purposes for collecting personal information". Notice that this does not mean that companies must disclose their purposes to the public. However, consider the following statement in the regulation:

"Tell your customers why your organization needs their personal information before or at the time of collection." - PIPEDA Fair Information Principle 2 – Identifying Purposes [pipeda](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_purposes/)

Notice the lack of specificity to this requirement. Principle 2 only requires that companies give their customers a reason for collecting personal information, not that the reason needs to be specific or detailed. Additionally, "before or at the time of collection" does not provide a clear timeline or frequency for disclosures for ongoing data collection. This is especially concerning for trackers like Fitbit, which continually collects personal data from users.

While Fitbit does inform users that data is collected through their privacy policy, without a clear definition of what constitutes a valid disclosure, Fitbit is essentially able to collect any information without adequate disclosure (to gain meaningful consent) while still being in compliance with this aspect of Principle 2.

This is seen in practice when Fitbit states, in their privacy policy, that they collect a wide range of PII for the purposes of providing their 'Services' (defined by Fitbit as "devices, applications, software, websites, APIs, products, and services"). This statement is so vague that it is essentially meaningless and does not provide users with a clear understanding of the purposes for which their personal information is collected.

Another requirement of Principle 2 is that companies "obtain their consent again should you identify a new purpose." [pipeda](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_purposes/)

Google notifies users of changes to their privacy policy through email in which continued use of their services is considered consent. Under PIPEDA, this is not considered valid consent, so Fitbit is not in compliance with this aspect of Principle 2.

#### 3. Consent

Fitbit's privacy policy states that it collects personal information for the purposes of providing its 'Services': "We work with partners who provide us with analytics and advertising services. This includes helping us understand how users interact with the Services"[^10]. This is a broad statement that does not clearly define the purposes for which personal information is collected.

Considering that PIPEDA's Fair Information Principle 3 requires that organizations "only collect, use or disclose personal information for purposes that a reasonable person would consider appropriate under the circumstances"[^3], Fitbit's data collection would not be accordance with this principle; most customers would not consider the collection of personal information for the purposes of advertising and marketing to be appropriate.

Furthermore, usage of vague language and contradiction in Fitbit's privacy policy makes it difficult for users to make informed choices. For example, the policy states: "We never sell the personal information of our users. We do work with partners who provide us with advertising services". This is a contradiction that seemingly attempts to take advantage of the fact that many users may not understand the difference between selling personal information and sharing it with third parties for advertising purposes.

"People must understand what they are consenting to. It is only considered valid if it is reasonable to expect that your customers will understand the nature, purpose and consequences of the collection, use or disclosure of their personal information." - PIPEDA Fair Information Principle 3 – Consent[^3]

Fitbit cannot claim to have obtained "meaningful consent" from its users as required by PIPEDA, because it has not clearly defined the purposes for which personal information is collected and has not provided clear and understandable information about the sharing of personal information with third parties.

Finally, the consent principle states "The form of consent must take into account the sensitivity of the personal information." The health information that Fitbit collects is among the most sensitive forms of information that can be collected as described by the OPC themselves [Application by the Courts and the OPC in Different Contexts](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda-compliance-help/pipeda-interpretation-bulletins/interpretations_10_sensible/). Fitbit watches, at their core, are health and fitness trackers, meaning the information that they collect (and subsequently share with advertisers and business partners) is highly sensitive. The fact that Fitbit commits these consent violations while also collecting highly sensitive information is inappropriately invasive and not in compliance with PIPEDA.

#### 4. Limiting Collection

"Limit the amount and type of information you collect to what is needed for the identified purposes" - PIPEDA Fair Information Principle 4 – Limiting Collection[^4]

Fitbit collects an excessive amount of personal information from its users. The requirement for a Google account to set up a device means that new Fitbit users are subject to Google's data collection practices. These practices are extensive and include web and app activity, map timeline, and YouTube history, among others, which are not necessary for the operation of a Fitbit device. They are further able to collect personal information for "identified purposes" such as (but not limited to) advertising, marketing, and analytics. In theory, Fitbit should not be able to collect user data for purposes that are not essential to the functionality of its devices under the Fair Information Principle.

However, consider the wording of PIPEDA's Fair Information Principle 4:

"Collect only the personal information your organization needs to fulfill a legitimate identified purpose." - PIPEDA Fair Information Principle 4 – Limiting Collection[^4]

Fitbit's privacy policy states that it only collects personal information that is necessary for the operation of its devices and essential 'Services'. However, these 'Services' include advertising and marketing, and the sharing of personal information with third parties such as advertisers and business partners. Because of vagueness in PIPEDA and a lack of definition of what constitutes "legitimate", Fitbit is able to collect more personal information than functionally necessary and share it with third parties under the guise of fulfilling a "legitimate identified purpose".

#### 5. Limiting Use, Disclosure, and Retention

"Obtain fresh consent if you intend to use or disclose personal information for a new purpose ... Collect, use or disclose personal information only for purposes that a reasonable person would consider appropriate in the circumstances." [^5]

Fitbit, through Google, does not obtain fresh, meaningful consent from users when it collects new personal information or implements new uses of personal information. Google's method of informing users of changes to its privacy policy is to send emails to users, which does not meet the more stringent requirements of PIPEDA for obtaining meaningful consent as described in principle 3.

Further, PIPEDA requires that user information must only be used for purposes that a reasonable person would consider appropriate in the circumstances, which, while a subjective standard, allows some flexibility for companies to use user information in ways that are not strictly necessary for the operation of their services. However, despite this flexibility, Fitbit's collection and use of personal data for advertising and marketing purposes, as well as their inconsistent privacy policies, overstep the bounds PIPEA sets for what is appropriate and are therefore not in compliance with principle 5.

In terms data retention, Fitbit complies well enough according to their [data retention policy](https://support.google.com/product-documentation/answer/13532616?hl=en#zippy=%2Cwhat-retention-periods-apply-to-my-data). Data used for watch and app features are retained indefinitely, and other data is retained only as long as is legally necessary, although they also add a clause that it may be retained for "legitimate business purposes". This statement is vague, but does not provide enough information to determine that this is a PIPEDA violation.

#### 6. Accuracy

To "minimize the possibility of using incorrect information"[^6], Fitbit Health Center provides information on how to change their name, sex, weight, height, email address, profile and cover photo. [cool](https://support.google.com/fitbit/answer/14236616?hl=en#zippy=%2Cfitbit-app). Fitbit also allows users to edit, delete, or manually log health statistics such as exercise, food, water, and sleep. This is important because it allows users to correct any inaccuracies in the data that Fitbit collects. [here](https://support.google.com/fitbit/answer/14236402?sjid=17926729679153827284-NA)

However, there is no information on how to correct inaccuracies in data collected by Google, or how to correct inaccuracies in data shared with third parties. But this is not enough to determine that Fitbit is in violation of Principle 6, as they do provide a way to correct inaccuracies in the data that they collect, though the scope of this correction is limited.

#### 7. Safeguards

Principle 7 requires organizations to "protect personal information in a way that is appropriate to how sensitive it is." 


"Protect all personal information (regardless of how it is stored) against loss, theft, or any unauthorized access, disclosure, copying, use or modification." - PIPEDA Fair Information Principle 7 – Safeguards


Google, and by extension Fitbit, has significant business interests in protecting the data it collects and uses, as it drives their primary goal as an internet advertising company. Google employs thousands of cybersecurity professionals (even adding as much as 2600 employees in [one quarter in 2022](https://bankautomationnews.com/allposts/core-cloud/google-cloud-adds-2600-cybersecurity-employees/)), and has [whitepapers](https://services.google.com/fh/files/misc/google_security_wp.pdf) on their security practices. Drawing from this, it is reasonable to assume that Google has industry-leading security practices considering that an organization of their size has only had sub-10 [data breaches](https://firewalltimes.com/google-data-breach-timeline/). The fact that Google has these practices in place to protect the data it collects and stores, meaning that Fitbit is in compliance with the Safeguards principle of PIPEDA.

#### 8. Openness

Fitbit's privacy policy is not open and transparent. It is vague, contradictory, and does not clearly define the purposes for which personal information is collected, used, and disclosed to third parties.

To use the language of PIPEDA, Fitbit's privacy policy is not "easily understandable" and "easily available" to its users as required by PIPEDA's Fair Information Principle 8 – Openness. [^8]

Furthermore, it is likely that users find Fitbit's ToS and Privacy Policies "difficult to understand, yet they feel compelled to give their consent in order to obtain the goods and services they want."[^8] In fact, Fitbit's Privacy Policies and Terms of Service are sprawled across 8 different web pages, and are not easily accessible from the Fitbit website. [I have compiled them here.](m1/fitbit_privacy_policies.md)

This makes it difficult for non-technical users to navigate. Even if a user were to find and read all of Fitbit's privacy policies, they would find that it is (as mentioned in previous section) vague, contradictory, and does not define the extent for which personal data is collected, used, and disclosed to third parties. This obfuscation is likely intentional; Fitbit does not want its users to understand the full extent of its data collection and sharing practices, as Google relies on the collection of personal information for its advertising and marketing services. Knowledge of the full extent of Fitbit's data collection and sharing practices would likely deter many users from using Fitbit devices and services.

#### 9. Individual Access

Fitbit provides users with the ability to access the personal information that they collect[^16], as required by PIPEDA.[^9] 

Google also provides users with in-depth access to PII that they collect[^15]. Users can access their data through the [Google Takeout](https://takeout.google.com/settings/takeout) service, which allows users to download their data from Google's services free of cost.

Google does not give additional information about how PII "is or has been used and to whom it has been disclosed"[^9], however this is not enough to determine that Google is in violation of Principle 9, as they do provide this information to some extent in their Privacy Policy. Again, we see the same issue of vague language and lack of definition in PIPEDA that allows companies to skirt regulations by simply providing an explanation of their data collection practices, regardless of how vague or contradictory that explanation may be.


#### 10. Challenging Compliance

Ideally, this principle provides individuals with the ability to challenge an organization's compliance with PIPEDA to protect their privacy rights.[^10]

However, it falls victim to the same issues as the other principles: vague language, and notably, a lack of enforcement.

As mentioned in the Accountability section, Fitbit does not name a designated privacy official to whom users can direct their privacy concerns, but they do provide contact information to their DPO. Whether or not users can challenge PIPEDA compliance through the DPO is unclear.

After thorough review of Google's Privacy Policy and Terms of Service, as well as navigating through Google Help Center using keywords "Privacy", "PIPEDA", "Challenging Compliance", "OPC", and many others, I was unable to find any information on how to challenge Google's compliance with PIPEDA. A Google search yielded no such information either. In fact, there is no instruction on how to contact Google about privacy, or challenge Google's compliance with _any_ privacy regulation.

Google, and by extension PIPEDA, fails to "tell complainants about their avenues of recourse"[^10] in case of unlawful data collection or sharing practices. The glaring lack of enforcement and avenues of recourse for individuals to challenge Google's compliance with PIPEDA is a significant oversight in the regulation, and an unfortunate consequence of PIPEDA's enforcement mechanisms.

## 4. Conclusions

### 4.1 Summary

As a user, buying a Fitbit is often a step toward reclaiming control over your health and by extension, your life. Yet, paradoxically, this quest for autonomy over our bodily data might lead us down a path of giving up control. The reality is that, in our pursuit of health insights, we might be unknowingly trading away the privacy of our most personal data.

Our Case study on Fitbit devices reduces to the following important points:

- **Privacy Implications of Data Collection**: Fitbit watches, renowned for their accuracy in health and fitness tracking, collect an extensive range of personal information. Nowadays, this not only includes basic metrics like steps and sleep patterns, but also more personal data such as location, heart rate, and even indicators of  mental health states.

- **Impact of Google’s Acquisition**: The acquisition of the company by Google marks a significant shift in the privacy landscape of wearable devices. This merger has raised concerns regarding the potential for increased data sharing and profiling, given Google's predominance in data analytics and advertising. The transition has also been marked by changes in Fitbit’s operational decisions, such as the requirement for Fitbit users to migrate to Google accounts, which could centralize user data to broader data processing practices.

- **Compliance with Privacy Regulations**: Our analysis indicates that Fitbit's current privacy practices pose challenges in compliance with privacy regulations such as PIPEDA. Issues such as consent, data minimization, and transparency have emerged as areas where current practices may not fully align with regulatory expectations.

- **User Concerns and Trust**: Feedback from the Fitbit user community reflects growing concerns over privacy, data security, and the potential misuse of personal health information. The community's reaction to changes in the Fitbit app and service offerings, particularly around community features and data management options, highlights the delicate balance between innovation and user trust. [Example of community reaction](https://community.fitbit.com/t5/Fitbit-com-Dashboard/In-2025-a-Google-Account-will-be-required/td-p/5479047)



### 4.2 Implications of future developments for Privacy and Policy

The acquisition of Fitbit by Google shows a significant move by the corporation into the health technology arena and sparks important privacy and competitiveness concerns. Despite the company's assurance that Fitbit's health data won't be used for advertising purposes, the broader implications for such data within its extensive data gathering system remain unclear. The requirement for a Google account to exist for Fitbit's users makes users' health information more easily integrable Google's data network, raising concerns over transparency and control over personal data, specifically profiling. This development has attracted attention from regulatory bodies and privacy advocates. [Googles Acquisition](https://www.forbes.com/sites/kateoflahertyuk/2021/01/17/google-confirms-fitbit-deal-is-it-time-to-quit-your-smartwatch/?sh=3b82bbc81596)

There is also the issue of integrating data collected by Fitbit with health insurance policies. This approach motivates individuals to maintain healthy lifestyles by offering financial rewards or lower insurance premiums in exchange for sharing their health data. The idea is straightforward: by monitoring activities, heart rate, and sleep patterns, individuals can potentially reduce their healthcare costs.
The mechanism behind this integration involves policyholders sharing their bodily metrics with their insurance providers. If the data indicate healthy behaviors, the individual could benefit from reduced premiums or other financial advantages. This structure aims to encourage healthier living and, by extension, reduce healthcare expenses for both insurers and insured individuals. [Insurance and Your Fitbit Data: A Profitable Exchange?](https://www.washingtonpost.com/business/2018/09/25/an-insurance-company-wants-you-hand-over-your-fitbit-data-so-they-can-make-more-money-should-you/)

However, this innovative model raises several concerns within the context of the Affordable Care Act, which applies in the U.S.A. under Obamacare, which assures that health insurance coverage cannot discriminate based on pre-existing conditions. The potential for health data from wearables to influence insurance coverage decisions leads to a nuanced challenge. It suggests the possibility of a future where individuals could face higher premiums or coverage adjustments based on lifestyle data, undermining lawful protections. There thus exists a risk of creating disparities in insurance costs, disproportionately affecting those who may not meet prescribed health metrics because of factors beyond their control. While the use of wearable technology presents an opportunity to promote health and reduce insurance costs, it necessitates careful considerations of user privacy, equity, and regulatory compliance.
[The Risks of Sharing Fitbit Data with Insurers](https://www.govtech.com/health/could-your-fitbit-data-be-used-to-deny-you-health-insurance.html)

The advancement in wearable technology innovations promises enhanced health monitoring capabilities in the future. For instance, modern wearable devices now incorporate sensors for tracking not just physical activity but also heart rate variability, sleep quality, blood oxygen levels, and even stress levels through skin temperature and electrodermal activity sensors. These developments also come with privacy concerns regarding the extent of data collection. Future versions of devices by Fitbit could be able to collect even more intimate data about a user's lifestyle, health conditions, and habits. This increases the need for stricter privacy protection and ethical considerations in the use of bodily health monitoring technologies. [Prospective development of Fitbit Watches](https://www.theverge.com/22982833/best-fitbit-watch-fitness-tracker)

### 4.3 Ideas for Future Research

We emphasize the need and inspiration for deeper investigation in three potential areas:

- Investigating how Fitbit data's integration into insurance impacts premiums and job decisions is vital for ethical and privacy standards.

- Look into how to develop technologies that minimize data collection and improve security to protect user privacy.

- Query users on their concerns and perceptions about health data privacy. This will foster more transparent and user-friendly privacy practices.

By focusing on these areas, we can address the challenges of privacy in the case of digital health watches.

## 5. Appendix

- Detailed Data Sets
- Technical Documentation
- Survey Instruments and Results

## 6. References

[^1]: [PIPEDA Fair Information Principle 1 – Accountability](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_accountability/)
[^2]: [PIPEDA Fair Information Principle 2 – Identifying Purposes](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_accountability/)
[^3]: [PIPEDA Fair Information Principle 3 – Consent](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_consent/)
[^4]: [PIPEDA Fair Information Principle 4 – Limiting Collection](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_collection/)
[^5]: [PIPEDA Fair Information Principle 5 – Limiting Use, Disclosure, and Retention](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_use/)
[^6]: [PIPEDA Fair Information Principle 6 – Accuracy](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_accuracy/)
[^7]: [PIPEDA Fair Information Principle 7 – Safeguards](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_safeguards/)
[^8]: [PIPEDA Fair Information Principle 8 – Openness](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_openness/)
[^9]: [PIPEDA Fair Information Principle 9 – Individual Access](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_access/)
[^10]: [PIPEDA Fair Information Principle 10 – Challenging Compliance](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_compliance/)
[^10]: [Fitbit Privacy Policy](https://www.fitbit.com/global/en-ca/legal/privacy-policy#analytics-and-advertising)
[^12]: [Fitbit Developer Policy](https://dev.fitbit.com/legal/fitbit-user-data-and-developer-policy/)
[^14]: [History of Fitbit and Fitbit Products](https://www.verizon.com/articles/Accessories/history-of-fitbit/)
[^16]: [Fitbit Privacy Policy - Rights to Access Info](https://www.fitbit.com/global/en-ca/legal/privacy-policy#your-rights-to-access)
[^15]: [Google User Info Export](https://www.fitbit.com/global/en-ca/legal/privacy-policy#your-rights-to-access)