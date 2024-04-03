import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "AppData.db";
const database_version = "1.0";
const database_displayname = "SQLite App Data Database";
const database_size = 200000;

// Function to initialize the database
export const getDBConnection = async () => {
  return SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
};

// Function to create tables if they don't exist
export const createTables = async (db) => {
  const queryPersonalInfo = `CREATE TABLE IF NOT EXISTS PersonalInfo (
                              InfoID INTEGER PRIMARY KEY AUTOINCREMENT,
                              AgeRange TEXT,
                              Gender TEXT,
                              Height INTEGER,
                              Weight INTEGER,
                              FitnessGoals TEXT)`;

  const queryPreferences = `CREATE TABLE IF NOT EXISTS Preferences (
                              PrefID INTEGER PRIMARY KEY AUTOINCREMENT,
                              DataRetentionTime TEXT,
                              NotificationDataRetentionEnabled BOOLEAN,
                              NotificationGoalReached BOOLEAN)`;

  const queryDataCollectionFlags = `CREATE TABLE IF NOT EXISTS DataCollectionFlags (
                                      FlagID INTEGER PRIMARY KEY AUTOINCREMENT,
                                      CollectDailySteps BOOLEAN,
                                      CollectHeartRate BOOLEAN,
                                      CollectBloodPressure BOOLEAN,
                                      CollectSleepPatterns BOOLEAN,
                                      CollectWaterIntake BOOLEAN)`;

  const queryDailyData = `CREATE TABLE IF NOT EXISTS DailyData (
                            DataID INTEGER PRIMARY KEY AUTOINCREMENT,
                            Date TEXT,
                            DailySteps INTEGER,
                            HeartRate INTEGER,
                            BloodPressure INTEGER,
                            SleepPatterns INTEGER,
                            WaterIntake INTEGER)`;

  await db.transaction((tx) => {
    tx.executeSql(queryPersonalInfo);
    tx.executeSql(queryPreferences);
    tx.executeSql(queryDataCollectionFlags);
    tx.executeSql(queryDailyData);
  });
};

export const updatePersonalInfo = async (db, info) => {
    // Destructure with default values to prevent undefined
    const { AgeRange = null, Gender = null, Height = null, Weight = null, FitnessGoals = null } = info;
  
    // Initialize parts of the query
    let query = `UPDATE PersonalInfo SET `;
    let args = [];
    let setters = [];
  
    
    if (AgeRange !== null) {
      setters.push(`AgeRange = ?`);
      args.push(AgeRange);
    }
    if (Gender !== null) {
      setters.push(`Gender = ?`);
      args.push(Gender);
    }
    if (Height !== null) {
      setters.push(`Height = ?`);
      args.push(Height);
    }
    if (Weight !== null) {
      setters.push(`Weight = ?`);
      args.push(Weight);
    }
    if (FitnessGoals !== null) {
      setters.push(`FitnessGoals = ?`);
      args.push(FitnessGoals);
    }
  
    // Join the parts of the query
    query += setters.join(', ');
    query += ` WHERE InfoID = 1`; // Assuming there's only one record to update.
  
    // Execute if there's something to update
    if (args.length > 0) {
      await db.transaction((tx) => {
        tx.executeSql(query, args);
      });
    } else {
      console.log("No data provided for update");
    }
  };
 
  
