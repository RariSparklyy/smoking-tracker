import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Animated } from 'react-native';
import { useSmoke } from '../context/SmokeContext';
import { getTodayLogs, getWeekLogs, calculateMoneySpent } from '../utils/calculations';
import GradientText from '../components/GradientText';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { logs, settings, addSmokeLog, removeLog, loading } = useSmoke();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showToast, setShowToast] = useState(false);

  const todayLogs = getTodayLogs(logs);
  const weekLogs = getWeekLogs(logs);
  const moneySpent = calculateMoneySpent(todayLogs, settings.cigarettePrice);

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
        <ActivityIndicator size="large" color="#40ffaa" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showToast && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#40ffaa', '#4079ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.toastGradient}
          >
            <Text style={styles.toastIcon}>✓</Text>
            <Text style={styles.toastText}>Cigarette logged successfully</Text>
          </LinearGradient>
        </Animated.View>
      )}

      <GradientText
        colors={['#40ffaa', '#4079ff', '#40ffaa']}
        style={styles.title}
      >
        Today's Count
      </GradientText>

      <Text style={styles.count}>{todayLogs.length}</Text>
      <Text style={styles.subtitle}>cigarettes</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogSmoke}>
          <LinearGradient
            colors={['#40ffaa', '#4079ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logButton}
          >
            <Text style={styles.logButtonText}>Log Smoke</Text>
          </LinearGradient>
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
        <LinearGradient
          colors={['#ff6b6b22', '#ff6b6b44']}
          style={styles.warningBox}
        >
          <Text style={styles.warningText}>⚠️ You've reached your daily goal!</Text>
        </LinearGradient>
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
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={['#40ffaa', '#4079ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
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
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    padding: 20,
  },
  centerContent: {
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  title: {
    fontSize: 24,
    marginTop: 40,
  },
  count: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#40ffaa',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logButton: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
  },
  logButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  undoButton: {
    backgroundColor: '#1a1a1a',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#40ffaa',
  },
  undoButtonDisabled: {
    borderColor: '#333',
    opacity: 0.5,
  },
  undoButtonText: {
    color: '#40ffaa',
    fontSize: 28,
    fontWeight: 'bold',
  },
  toast: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    zIndex: 1000,
    borderRadius: 10,
    overflow: 'hidden',
  },
  toastGradient: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  warningText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 20,
  },
  statBox: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 150,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40ffaa',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  goalContainer: {
    marginTop: 30,
    width: '100%',
  },
  goalText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
});