# Metrics Calculator Functions

Functions implemented in `calculatorFunctions.js` under `metricsCalculation` directory can be imported and used to calculate various health and fitness metrics. They are as follows:

## Trend Analysis

### `movingAverage(data: number[], N: number): number[]`
Calculates the moving average of a dataset to identify patterns over time. Inputs:
- `data`: An array of numeric data points.
- `N`: The number of periods in the average.
Output:
- An array of moving average values with length equal to the input data.

---

## Calorie Burn Estimation

### `calculateCaloriesBurned(MET: number, weightKg: number, durationHours: number): number`
Estimates the calories burned during an activity based on the Metabolic Equivalent of Task (MET), user's weight in kilograms, and the duration of the activity in hours. Inputs:
- `MET`: Metabolic Equivalent of Task value for the activity.
- `weightKg`: User's weight in kilograms.
- `durationHours`: Duration of the activity in hours.
Output:
- Estimated calories burned as a numeric value.

---

## Body Mass Index (BMI) Calculation

### `calculateBMI(weightKg: number, heightM: number): number`
Calculates the Body Mass Index (BMI) using the user's weight in kilograms and height in meters. Inputs:
- `weightKg`: User's weight in kilograms.
- `heightM`: User's height in meters.
Output:
- Calculated BMI as a numeric value.

---

## Basal Metabolic Rate (BMR)

### `calculateBMR(weightKg: number, heightCm: number, age: number, isMale: boolean): number`
Estimates the Basal Metabolic Rate (BMR) based on the user's weight in kilograms, height in centimeters, age, and gender. Separate formulas are used for males and females. Inputs:
- `weightKg`: User's weight in kilograms.
- `heightCm`: User's height in centimeters.
- `age`: User's age in years.
- `isMale`: Boolean indicating if the user is male (`true`) or female (`false`).
Output:
- Estimated BMR as a numeric value.

---

## Heart Rate Zones for Exercise

### `calculateMHR(age: number): number`
Calculates the Maximum Heart Rate (MHR) based on the user's age using the formula: MHR = 220 - Age. Inputs:
- `age`: User's age in years.
Output:
- Calculated MHR as a numeric value.

### `calculateTargetHeartRateZone(MHR: number, restingHeartRate: number, desiredIntensity: number): number`
Determines the target heart rate zone for exercise based on the user's Maximum Heart Rate (MHR), resting heart rate, and desired intensity percentage. Inputs:
- `MHR`: Maximum Heart Rate calculated using `calculateMHR`.
- `restingHeartRate`: User's resting heart rate in beats per minute.
- `desiredIntensity`: Desired intensity percentage as a decimal value (e.g., 0.7 for 70% intensity).
Output:
- Target heart rate zone value as a numeric value.

---

## Daily Water Intake Recommendation

### `calculateDailyWaterIntake(weightKg: number, exerciseDurationHours: number): number`
Estimates the recommended daily water intake based on the user's weight in kilograms and the duration of exercise in hours. Inputs:
- `weightKg`: User's weight in kilograms.
- `exerciseDurationHours`: Duration of exercise in hours.
Output:
- Estimated daily water intake in liters as a numeric value.

