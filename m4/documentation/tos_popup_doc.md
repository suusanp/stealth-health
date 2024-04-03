**Documentation Summary: Implementing "Agree to Terms of Service" Popup in React Native**

**Objective:**
Create a "Agree to Terms of Service" popup in a React Native app that appears only once for a user on their first app launch.

**Steps Taken:**
1. **Created TermsOfServicePopup Component:**
   - Made a new component named `TermsOfServicePopup` to display the terms of service and agreement buttons.
   - Utilized AsyncStorage to track the user's agreement status and decide when to show the popup.

2. **Integrated Popup into Landing Page:**
   - Integrated the `TermsOfServicePopup` component into the `LandingPage` component.
   - Implemented logic in the `LandingPage` component to check AsyncStorage for the agreement status and show the popup accordingly.

3. **Testing and Debugging:**
   - Emulated a new user scenario by clearing AsyncStorage data in the `LandingPage` component's code.
   - Checked that the popup only appeared once for a new user and didn't reappear after the user agreed to the terms or closed the popup.

**Outcome:**
The implementation achieved the goal of displaying the "Agree to Terms of Service" popup only once for a new user on their initial app launch.
