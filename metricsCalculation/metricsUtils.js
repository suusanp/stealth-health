// Description: This file contains the function to return available functionalities based on enabled metrics.

const computeAvailableFunctionalities = (metrics) => {
  const availableFunctionalities = ['Body Mass Index (BMI)', 'Basal Metabolic Rate (BMR)']; // Always available from User Profile

  // Check each metric and add corresponding functionalities
  // This is not accurate yet and should be replaced with actual logic. 

  if (metrics.dailySteps) {
    availableFunctionalities.push('Calorie Burn Estimation');
  }
  if (metrics.heartRate) {
    availableFunctionalities.push('Heart Rate Zones for Exercise');
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
