// Trend Analysis
const movingAverage = (data, N) => {
    let movingAvg = [];
    for (let i = 0; i < data.length; i++) {
      if (i < N - 1) {
        movingAvg.push(null); // No average for initial data points
      } else {
        let sum = 0;
        for (let j = 0; j < N; j++) {
          sum += data[i - j];
        }
        movingAvg.push(sum / N);
      }
    }
    return movingAvg;
  };
  
  // Calorie Burn Estimation
  const calculateCaloriesBurned = (MET, weightKg, durationHours) => {
    return MET * weightKg * durationHours;
  };
  
  // BMI Calculation
  const calculateBMI = (weightKg, heightM) => {
    return weightKg / (heightM * heightM);
  };
  
  // Basal Metabolic Rate (BMR)
  const calculateBMR = (weightKg, heightCm, age, isMale) => {
    let bmr;
    if (isMale) {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
    }
    return bmr;
  };
  
  // Heart Rate Zones for Exercise
  const calculateMHR = (age) => {
    return 220 - age;
  };
  
  const calculateTargetHeartRateZone = (MHR, restingHeartRate, desiredIntensity) => {
    return (MHR - restingHeartRate) * desiredIntensity + restingHeartRate;
  };
  
  // Daily Water Intake Recommendation
  const calculateDailyWaterIntake = (weightKg, exerciseDurationHours) => {
    return weightKg * 0.033 + (exerciseDurationHours * 0.5);
  };
  
  // Estimation of Distance Walked
  const estimateDistanceWalked = (steps, heightCm, gender = 'male') => {
    const heightMeters = heightCm / 100;
    let strideLengthMeters;
  
    if (gender.toLowerCase() === 'male') {
      strideLengthMeters = heightMeters * 0.415;
    } else if (gender.toLowerCase() === 'female') {
      strideLengthMeters = heightMeters * 0.413;
    } else {
      // Use average if gender is not specified
      strideLengthMeters = heightMeters * 0.414;
    }
  
    const distanceMeters = strideLengthMeters * steps;
    const distanceKilometers = distanceMeters / 1000;
  
    return distanceKilometers;
  };
  
// Fatigue Level Estimation based on steps and sleep
const estimateFatigueLevel = (dailySteps, hoursSlept) => {
    const activityLevel = dailySteps / 10000; // Assuming 10,000 steps as an active day
    const sleepLevel = hoursSlept / 8; // Assuming 8 hours as optimal sleep
  
    if (activityLevel >= 1 && sleepLevel >= 1) {
      return "Low";
    } else if (activityLevel < 1 && sleepLevel < 1) {
      return "High";
    } else {
      return "Moderate";
    }
  };
  
  // Hydration Level Estimation
  const estimateHydrationLevel = (waterIntakeLiters, weightKg, exerciseDurationHours) => {
    const recommendedIntake = calculateDailyWaterIntake(weightKg, exerciseDurationHours);
    return waterIntakeLiters >= recommendedIntake ? "Adequate" : "Inadequate";
  };
  
  // Stress Level Indication based on resting heart rate and sleep patterns
  const indicateStressLevel = (averageHeartRate, hoursSlept) => {
    if (averageHeartRate > 80 || hoursSlept < 6) {
      return "High";
    } else if (averageHeartRate < 60 && hoursSlept > 7) {
      return "Low";
    } else {
      return "Moderate";
    }
  };
  
  // Risk Indicator for Health Conditions
  const healthConditionRiskIndicator = (BMI, bloodPressure) => {
    // Simplified conditions; real applications should use more comprehensive criteria
    if (BMI > 30 || bloodPressure.split('/')[0] > 140) {
      return "High risk of hypertension or type 2 diabetes";
    } else {
      return "Low risk";
    }
  };

  // Assuming MET values for common activities are defined elsewhere
const activityMETs = {
    'walking': 3.8, // Example MET value for walking
    // Add more activities as needed
};

// Function to calculate calories burned through activities
const calculateCaloriesBurnedFromActivities = (activities, weightKg) => {
    let totalCalories = 0;
    for (const [activity, hours] of Object.entries(activities)) {
        const MET = activityMETs[activity] || 1; // Default MET value to 1 if activity is not known
        totalCalories += MET * weightKg * hours;
    }
    return totalCalories;
};

// Function to estimate calories burned from steps (simple estimation)
const calculateCaloriesBurnedFromSteps = (steps, weightKg) => {
    const stepsPerCalorie = 20; // Rough estimation: around 20 steps to burn a calorie for an average person
    const caloriesFromSteps = steps / stepsPerCalorie;
    return caloriesFromSteps;
};

// Main function to calculate total daily calorie expense
const calculateTotalDailyCalorieExpense = (BMR, activities, steps, weightKg) => {
    const caloriesFromActivities = calculateCaloriesBurnedFromActivities(activities, weightKg);
    const caloriesFromSteps = calculateCaloriesBurnedFromSteps(steps, weightKg);
    const totalCalories = BMR + caloriesFromActivities + caloriesFromSteps;
    return totalCalories;
};

  
  // Exporting functions for use in other modules
  export {
    movingAverage,
    calculateCaloriesBurned,
    calculateBMI,
    calculateBMR,
    calculateMHR,
    calculateTargetHeartRateZone,
    calculateDailyWaterIntake,
    estimateDistanceWalked,
    estimateFatigueLevel,
    estimateHydrationLevel,
    indicateStressLevel,
    healthConditionRiskIndicator,
    calculateCaloriesBurnedFromActivities,
    calculateTotalDailyCalorieExpense,
  };
  