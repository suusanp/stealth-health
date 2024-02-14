# Presentation Talking Points

## Slide 1: Introduction to the Impact of Connected Health Watches

- Welcome, everyone. For our project, we decided work on the subject of connected health watches, devices that have seamlessly integrated into our daily lives, monitoring our every step, heartbeat, and minute of sleep.
- We've chosen to narrow our focus on the brand that not only pioneered this field but also led the revolution of smart health monitoring — Fitbit.
- Our presentation aims to unravel the layers of innovation brought about by connected health watches, with a particular lens on Fitbit. We're here to spark a conversation about the balance between health empowerment and the privacy trade-offs that come with these advancements.

## Slide 2: The Rise of Fitbit

- Fitbit started as a modest venture in 2007, aiming to make fitness tracking accessible to everyone. Its initial product was a revelation, offering users a simple way to track their steps and activity levels."
- Over the years, Fitbit has significantly expanded its functionality. From basic step counting, it now offers comprehensive health insights, including heart rate monitoring, sleep analysis, and even stress tracking, transforming the landscape of personal health monitoring."
- This evolution reflects not just technological advancement but a shift in how we view and manage our health. Fitbit has played a pivotal role in making health tracking a part of our daily routine, empowering users with data previously available only through medical professionals."
 

## Slide 3: Why Focus on Fitbit?
- The company has sold more than 120 million devices and has 29 million users in over 100 countries.
- Fitbit's popularity isn't just about the numbers; it's about the scale and scope of data collection. Every step, every heartbeat, and every minute of sleep from millions of users worldwide contributes to an immense pool of health data."
- The acquisition of Fitbit by Google in 2021 marked a significant moment for the company and its users. This move brought Fitbit into the fold of one of the largest data-processing companies in the world, raising important questions about data privacy and security."
- Focusing on Fitbit allows us to explore these critical issues from a unique vantage point. It's not just a leader in health technology; it's a case study in the intersection of health, technology, and privacy. As we delve deeper into Fitbit's practices and policies, we uncover broader implications for the privacy of health data in the digital age."
- We will focus specifically on the PII leakages induced by the transition to Fitbit from their old wearables to their current Google-owned model: the requirement for a Google account and its implications, and data integrations.

### Slide 4:Fitbits Systematic Data Collection
- Our investigation into Fitbit’s data practices uncovered a startling reality: the device collects an extensive range of personal information, encompassing everything from your daily movements and sleep habits to precise location data."
- The depth and breadth of the data captured by Fitbit are alarming. It’s not just about counting steps or monitoring sleep; it’s a comprehensive digital footprint of our lifestyles, habits, and, by extension, our privacy." 
- Data is collected as soon as you set up your device:
    - A Google account is required if you purchase a new device today (Name, Birthday, Gender, Email)
    - A Google account means Web/App activity, Map Timeline, Youtube history saved by default
    - Personalized ads and personalized search results on by default
    - To set up Fitbit: Height, Weight, Sex required
    - GPS signals, device sensors, WiFi access points, cell tower ids, IP address
    - Optional: Activity, Exercise, Sleep, Heart Rate, Profile photo, Biography, Country, Username
    - Sensor data
    - Phone calls and information
    - Contact information/Friends
- Issues:
    - Shared with third-parties (different privacy policies)
    - Google/Fitbit can use data to train/improve their services, AI models
    - Aggregate data for targeted ads
    - So much sensitive data collected, what if there is a data leak?, what if there is a password leak? (already happened)
    - Attackers: fraud, extortion


### Slide 5: Privacy Implications and Legal Compliance

- A quick comparison of Fitbit's privacy practices and PIPEDA guidelines.
- Don't have much time so I will only focus on the ones that Fitbit may not be following.

A list of Principles of PIPEDA that Fitbit may not be following:
- Consent: Fitbit may not be obtaining meaningful consent from users before collecting, using, or disclosing their personal information. 
    - To use Fitbit device, new users are immediately prompted to register with a Google account, which means that they are subject to Google's data collection practices. Fitbit is continuously collecting and uploading personal information to Google, users may not be aware of the extent of this data collection.
    - This is violating the "meaningful" part of the consent principle. As stated by PIPEDA, consent is "only considered valid if it is reasonable to expect that your customers will understand the nature, purpose and consequences of the collection, use or disclosure of their personal information."
    - Even more concerning that Fitbit's privacy policy makes use of vague laguage and antistatements.
- Limiting Collection: Fitbit may be collecting more personal information than necessary for its stated purposes.
    - Google's data collection practices are extensive and include web and app activity, map timeline, and YouTube history, among others, which are not necessary for the operation of a Fitbit device.
- Limiting Collection: Fitbit may be collecting more personal information than necessary for its stated purposes.
    - Fitbit requires a Google account to set up a new device, which means that Fitbit users are subject to Google's data collection practices. Google's data collection practices are extensive and include web and app activity, map timeline, and YouTube history, among others, which are not necessary for the operation of a Fitbit device.
- Limiting Use, Disclosure, and Retention: Fitbit may be using and disclosing personal information for purposes other than those for which it was collected.
    - Again, Fitbit users are subject to Google's data collection practices, which include personalized ads and personalized search results, violating the "for purposes that a reasonable person would consider appropriate in the circumstances" point of the principle.
- Openness: Fitbit privacy policies are difficult to understand, yet they feel compelled to give their consent in order to obtain the goods and services they want. 
    - Here is a list of Fitbit's privacy policies and terms of service that users are subject to:
        - [Fitbit Privacy Policy](https://www.fitbit.com/global/en-ca/legal/privacy-policy)
        - [Fitbit Terms of Service](https://www.fitbit.com/global/en-ca/legal/terms-of-service)
        - [Fitbit Additional Terms of Service](https://support.google.com/product-documentation/answer/13511576)
        - [Cookie Use Statement](https://www.fitbit.com/global/en-ca/legal/cookie-policy)
        - [List of Cookies](https://www.fitbit.com/global/en-ca/legal/cookie-list): A list of cookies used by Fitbit website
        - [Privacy Policy for Children's Account](https://www.fitbit.com/global/en-ca/legal/kids-privacy-policy)
        - [Google Privacy and Terms](https://policies.google.com/privacy)
        - [Google ToS](https://policies.google.com/terms)
    - There are so many different privacy policies and terms of service that it is difficult to understand what is being agreed to. How can non tech-savvy users understand what they are agreeing to?
### Slide 6: Policy vs. Practice


- A Users perspective, The aquisition of a fitbit 

### Slide 7: Future Developments and Rising Privacy Concerns

- Fitbit's journey into the future is marked by two significant developments: its acquisition by Google in 2021 and its deals with health insurance companies.
-  These changes signal a shift in how our health data may serve not just our fitness goals but broader economic interests. 
- With Google's acquisition, a new requirement emerges: owning a Fitbit now necessitates a Google account, embedding our health data within Google's vast data ecosystem. This consolidation of data raises valid concerns about privacy, as it places intimate health details a step closer to the expansive reach of digital advertising and profiling.

- Furthermore, Fitbit's partnerships with health insurance firms introduce a nuanced layer of privacy considerations. 
- Our steps, our heart rates, and our sleep patterns could potentially influence our health insurance premiums. 
- This intertwining of health monitoring and insurance policies not only blurs the lines between health support and financial implications but also prompts a critical question: Who truly benefits from our health data?

As we stand at this crossroads, the excitement of technological advancement is undeniably tinged with caution. The promise of personalized health coverage and the allure of tech-enhanced fitness tracking come with a price tag on our privacy. 

### Slide 8: Conclusion and 
- Embarking on a journey with a Fitbit on your wrist is often a step toward reclaiming control over your health. Yet, paradoxically, this quest for autonomy over our bodily data might lead us down a path of relinquishing control. The stark reality is that, in our pursuit of health insights, we might be unknowingly trading away the privacy of our most personal data.

- This revelation is not a call to discard our devices but a prompt to engage with them more wisely. To safeguard our privacy while still enjoying the benefits of smartwatches, consider these steps:

- Be discerning about which third-party companies you allow access to your health data. A quick glance through their privacy policies can reveal how they intend to use, secure, or possibly sell your information.
- Take advantage of device and network settings to limit ad tracking. For iPhone users, this means navigating to Privacy settings to restrict ad tracking, and for Google users, turning off ad personalization in your account settings.
- In an era where technology offers unparalleled control over our health, let's ensure this control extends to our privacy. By adopting these practices, we maintain stewardship over our data, ensuring our journey towards health remains firmly in our hands.
## possible questions to prepare for:

- why are you not focusing on Apple watch.
- why would the Google aquisition be a problem
- how to we do a private by design product here
- compare the situation under gdpr's Guidelines
-

