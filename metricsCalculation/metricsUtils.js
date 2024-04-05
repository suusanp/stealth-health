// Description: This file contains the function to return available functionalities based on enabled metrics.

// NOTE: This function assumes that user has entered their HEIGHT, WEIGHT, AGE, and GENDER in the User Profile.
const computeAvailableFunctionalities = (metrics) => {
  const availableFunctionalities = ['Body Mass Index (BMI)', 'Basal Metabolic Rate (BMR)', 'Heart Rate Zones for Exercise']; // Always available from User Profile

  // Check each metric and add corresponding functionalities
  // This is not accurate yet and should be replaced with actual logic. 

  if (metrics.dailySteps) {
    availableFunctionalities.push('Calorie Burn Estimation', 'Calorie Trend Analysis');
  }
  if (metrics.heartRate) {
    availableFunctionalities.push('Heart Rate Monitoring', 'Heart Rate Trend Analysis');
  }
  if (metrics.bloodPressure) {
    availableFunctionalities.push('Blood Pressure', 'Blood Pressure Trend Analysis');
  }
  if (metrics.sleepPatterns) {
    availableFunctionalities.push('Sleep Quality Assessment', 'Sleep Pattern Analysis');
  }
  if (metrics.waterIntake) {
    availableFunctionalities.push('Daily Water Intake Recommendation', 'Water Intake Trend Analysis');
  }

  return availableFunctionalities;
};

// Export the function for use in other files
export default computeAvailableFunctionalities;
