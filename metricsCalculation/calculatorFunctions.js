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


  // Activity to MET values mapping
const activityMETs = {
  'running': 7.5, // Approx MET value for running
  'cycling': 6.0, // Approx MET value for cycling
  'swimming': 8.3,
  'hiking': 6.0,
  'yoga': 2.5,
  'pilates': 3.0,
  'crossfit': 8.0,
  'dancing': 7.2,
  'boxing': 12.0,
  'rock_climbing': 8.0,
  'weight_training': 3.0,
  'skiing': 6.8,
  'snowboarding': 5.3,
  'surfing': 3.0,
  'skateboarding': 5.0,
  'kayaking': 5.0,
  'rowing': 6.0,
  'jump_rope': 12.0,
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
  
  // Improved Daily Water Intake Calculation
const calculateDailyWaterIntake = (weightKg, activities, environmentFactor = 1) => {
  let baseIntake = weightKg * 0.033; // Base daily intake in liters (33ml per kg of bodyweight)
  let activityIntake = 0;

  activities.forEach(activity => {
      // Assume each activity object has 'type' and 'duration' in hours
      const MET = activityMETs[activity.type] || 1; // Default MET value to 1 if activity is not known
      // Assuming 0.5 liters additional for every hour of activity by default
      // This can be adjusted based on MET value for more accuracy
      activityIntake += 0.5 * activity.duration * MET;
  });

  // Adjust for environmental factors (e.g., 1.2 for hot and humid environments)
  return (baseIntake + activityIntake) * environmentFactor;
};

// Hydration Level Estimation considering activity type and environmental factors
const estimateHydrationLevel = (waterIntakeLiters, weightKg, activities, environmentFactor = 1) => {
  const recommendedIntake = calculateDailyWaterIntake(weightKg, activities, environmentFactor);
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


// Function to calculate calories burned through activities
const calculateCaloriesBurnedFromActivities = (activities, weightKg) => {
    let totalCalories = 0;
    for (const [activity, hours] of Object.entries(activities)) {
        const MET = activityMETs[activity] || 1; // Default MET value to 1 if activity is not known
        totalCalories += MET * weightKg * hours;
    }
    return totalCalories;
};


const calculateCaloriesBurnedFromSteps = (steps, weightKg) => {
  const milesWalked = steps / 2000; // Assuming an average of 2,000 steps per mile
  const weightLbs = weightKg * 2.20462; // Convert weight from kg to lbs for this formula
  const caloriesPerMile = 0.57; // Calories burned per mile per pound of body weight

  const caloriesFromSteps = milesWalked * weightLbs * caloriesPerMile;
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
    calculateCaloriesBurnedFromSteps,
  };
  