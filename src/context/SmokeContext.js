import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSmokeLogs, saveSmokeLog, deleteSmokeLog, clearAllLogs, getSettings, saveSettings } from '../utils/storage';

const SmokeContext = createContext();

export const SmokeProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [settings, setSettings] = useState({
    cigarettePrice: 15.00,
    dailyGoal: 10,
    startDate: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);

  // Load data when app starts
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [loadedLogs, loadedSettings] = await Promise.all([
        getSmokeLogs(),
        getSettings(),
      ]);
      setLogs(loadedLogs);
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new smoke log
  const addSmokeLog = async (notes = '') => {
    try {
      const newLog = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        notes,
      };
      
      const updatedLogs = await saveSmokeLog(newLog);
      setLogs(updatedLogs);
      return true;
    } catch (error) {
      console.error('Error adding smoke log:', error);
      return false;
    }
  };

  // Delete a smoke log
  const removeLog = async (logId) => {
    try {
      const updatedLogs = await deleteSmokeLog(logId);
      setLogs(updatedLogs);
      return true;
    } catch (error) {
      console.error('Error removing log:', error);
      return false;
    }
  };

  // Clear all logs
  const resetAllData = async () => {
    try {
      await clearAllLogs();
      setLogs([]);
      return true;
    } catch (error) {
      console.error('Error resetting data:', error);
      return false;
    }
  };

  // Update settings
  const updateSettings = async (newSettings) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      await saveSettings(updatedSettings);
      setSettings(updatedSettings);
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  };

  const value = {
    logs,
    settings,
    loading,
    addSmokeLog,
    removeLog,
    resetAllData,
    updateSettings,
  };

  return <SmokeContext.Provider value={value}>{children}</SmokeContext.Provider>;
};

// Custom hook to use the context
export const useSmoke = () => {
  const context = useContext(SmokeContext);
  if (!context) {
    throw new Error('useSmoke must be used within a SmokeProvider');
  }
  return context;
};