import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Animated } from 'react-native';
import { useSmoke } from '../context/SmokeContext';
import { getTodayLogs, getWeekLogs, calculateMoneySpent } from '../utils/calculations';

export default function HomeScreen() {
  const { logs, settings, addSmokeLog, removeLog, loading } = useSmoke();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showToast, setShowToast] = useState(false);

  const todayLogs = getTodayLogs(logs);
  const weekLogs = getWeekLogs(logs);
  const moneySpent = calculateMoneySpent(todayLogs, settings.cigarettePrice);

  // Toast notification animation
  useEffect(() => {
    if (showToast) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowToast(false));
    }
  }, [showToast]);

  const handleLogSmoke = async () => {
    const success = await addSmokeLog();
    if (success) {
      setShowToast(true);
    } else {
      Alert.alert('Error', 'Failed to log cigarette. Please try again.');
    }
  };

  const handleUndo = () => {
    if (todayLogs.length === 0) {
      Alert.alert('No Logs', 'There are no cigarettes logged today to undo.');
      return;
    }

    Alert.alert(
      'Undo Last Entry',
      'Remove the most recent cigarette log?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            // Get the most recent log (first in the array since they're sorted newest first)
            const mostRecentLog = todayLogs[0];
            const success = await removeLog(mostRecentLog.id);
            if (!success) {
              Alert.alert('Error', 'Failed to remove log. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Toast Notification */}
      {showToast && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <Text style={styles.toastIcon}>✓</Text>
          <Text style={styles.toastText}>Cigarette logged successfully</Text>
        </Animated.View>
      )}

      <Text style={styles.title}>Today's Count</Text>
      <Text style={styles.count}>{todayLogs.length}</Text>
      <Text style={styles.subtitle}>cigarettes</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logButton} onPress={handleLogSmoke}>
          <Text style={styles.logButtonText}>Log Smoke</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.undoButton, todayLogs.length === 0 && styles.undoButtonDisabled]} 
          onPress={handleUndo}
          disabled={todayLogs.length === 0}
        >
          <Text style={styles.undoButtonText}>↶</Text>
        </TouchableOpacity>
      </View>

      {todayLogs.length > 0 && todayLogs.length >= settings.dailyGoal && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ You've reached your daily goal!</Text>
        </View>
      )}

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{weekLogs.length}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>MVR {moneySpent}</Text>
          <Text style={styles.statLabel}>Today's Cost</Text>
        </View>
      </View>

      <View style={styles.goalContainer}>
        <Text style={styles.goalText}>
          Daily Goal: {settings.dailyGoal} cigarettes
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min((todayLogs.length / settings.dailyGoal) * 100, 100)}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  centerContent: {
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#333',
  },
  count: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  undoButton: {
    backgroundColor: '#FFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  undoButtonDisabled: {
    borderColor: '#ccc',
    opacity: 0.5,
  },
  undoButtonText: {
    color: '#FF6B6B',
    fontSize: 28,
    fontWeight: 'bold',
  },
  toast: {
    position: 'absolute',
    top: 3,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  toastIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 20,
  },
  statBox: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 150,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  goalContainer: {
    marginTop: 30,
    width: '100%',
  },
  goalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
  },
});