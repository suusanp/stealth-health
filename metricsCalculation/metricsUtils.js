// Description: This file contains the function to compute available functionalities based on enabled metrics.

const computeAvailableFunctionalities = (metrics) => {
  const availableFunctionalities = ['BMI',]; // Always available

  // Check each metric and add corresponding functionalities
  if (metrics.dailySteps) {
    availableFunctionalities.push('Trend Analysis', 'Calorie Burn Estimation');
  }
  if (metrics.heartRate) {
    availableFunctionalities.push('Calorie Burn Estimation', 'Sleep Quality Assessment', 'Heart Rate Zones for Exercise');
  }
  if (metrics.bloodPressure) {
    availableFunctionalities.push('Blood Pressure');
  }
  if (metrics.sleepPatterns) {
    availableFunctionalities.push('Sleep Quality Assessment');
  }
  if (metrics.waterIntake) {
    availableFunctionalities.push('Daily Water Intake Recommendation');
  }

  return availableFunctionalities;
};

// Export the function for use in other files
export default computeAvailableFunctionalities;
