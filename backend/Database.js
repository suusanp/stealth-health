import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "AppData.db";
const database_version = "1.0";
const database_displayname = "SQLite App Data Database";
const database_size = 200000;

/**
 * Initialize a SQLite database
 * @returns {Database}
 * 
 */
export const getDBConnection = async () => {
  return SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
};

/**
 * Creates the tables in the database
 * @param {Database} db 
 */
export const createTables = async (db) => {
  // Personal Info Table
  const queryPersonalInfo = `CREATE TABLE IF NOT EXISTS PersonalInfo (
                              InfoID INTEGER PRIMARY KEY AUTOINCREMENT,
                              AgeRange TEXT,
                              Gender TEXT,
                              Height INTEGER,
                              Weight INTEGER,
                              FitnessGoals TEXT)`;

  // Preferences Table
  const queryPreferences = `CREATE TABLE IF NOT EXISTS Preferences (
                              PrefID INTEGER PRIMARY KEY AUTOINCREMENT,
                              DataRetentionTime TEXT,
                              NotificationDataRetentionEnabled BOOLEAN,
                              NotificationGoalReached BOOLEAN)`;

  // User Permissions Flags for Data Collections Table
  const queryDataCollectionFlags = `CREATE TABLE IF NOT EXISTS DataCollectionFlags (
                                      FlagID INTEGER PRIMARY KEY AUTOINCREMENT,
                                      CollectDailySteps BOOLEAN,
                                      CollectHeartRate BOOLEAN,
                                      CollectBloodPressure BOOLEAN,
                                      CollectSleepPatterns BOOLEAN,
                                      CollectWaterIntake BOOLEAN)`;
  // Daily Data Table
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

/**
 * Update the Personal Info Table
 * @param {Database} db: database to be updated 
 * @param {Object} info: fields to be updated and their values
 */
export const updatePersonalInfo = async (db, info) => {
    // Initialize everything to default values to prevent undefined causing errors
    const { AgeRange = null, Gender = null, Height = null, Weight = null, FitnessGoals = null } = info;
  
    // Initialize the query
    let query = `UPDATE PersonalInfo SET `;
    let args = []; 
    let setters = [];
  
    // for every field in the info argument, update its value
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
  
    // make up the SQL statement
    query += setters.join(', ');
    query += ` WHERE InfoID = 1`; //only one personal info record because only one user because local database
  
    // Execute the SQL statement
    if (args.length > 0) {
      await db.transaction((tx) => {
        tx.executeSql(query, args);
      });
    } else {
      console.log("No data provided for update");
    }
  };
 
  
