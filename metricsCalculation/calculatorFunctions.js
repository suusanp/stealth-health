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
  };
  