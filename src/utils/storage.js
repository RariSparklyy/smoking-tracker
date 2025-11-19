import AsyncStorage from '@react-native-async-storage/async-storage';

const SMOKE_LOGS_KEY = '@smoke_logs';
const SETTINGS_KEY = '@settings';

// Save smoke logs
export const saveSmokeLog = async (log) => {
  try {
    const existingLogs = await getSmokeLogs(); // Fixed: was getSmokeLog()
    const updatedLogs = [log, ...existingLogs];
    await AsyncStorage.setItem(SMOKE_LOGS_KEY, JSON.stringify(updatedLogs));
    return updatedLogs;
  } catch (error) {
    console.error('Error saving smoke log:', error);
    throw error;
  }
};

// Get all smoke logs
export const getSmokeLogs = async () => {
  try {
    const logs = await AsyncStorage.getItem(SMOKE_LOGS_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Error getting smoke logs:', error);
    return [];
  }
};

// Delete a specific log
export const deleteSmokeLog = async (logId) => {
  try {
    const existingLogs = await getSmokeLogs();
    const updatedLogs = existingLogs.filter(log => log.id !== logId);
    await AsyncStorage.setItem(SMOKE_LOGS_KEY, JSON.stringify(updatedLogs));
    return updatedLogs;
  } catch (error) {
    console.error('Error deleting smoke log:', error);
    throw error;
  }
};

// Clear all logs
export const clearAllLogs = async () => {
  try {
    await AsyncStorage.removeItem(SMOKE_LOGS_KEY);
  } catch (error) {
    console.error('Error clearing logs:', error);
    throw error;
  }
};

// Save settings
export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

// Get settings
export const getSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : {
      cigarettePrice: 15.00, // MVR per cigarette
      dailyGoal: 10,
      startDate: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error getting settings:', error);
    return {
      cigarettePrice: 15.00,
      dailyGoal: 10,
      startDate: new Date().toISOString(),
    };
  }
};