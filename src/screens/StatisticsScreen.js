import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSmoke } from '../context/SmokeContext';
import { getMonthLogs, calculateMoneySpent, calculateDailyAverage, getTodayLogs, getWeekLogs } from '../utils/calculations';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../components/GradientText';

export default function StatisticsScreen() {
  const { logs, settings } = useSmoke();

  const todayLogs = getTodayLogs(logs);
  const weekLogs = getWeekLogs(logs);
  const monthLogs = getMonthLogs(logs);
  
  const dailyAverage = calculateDailyAverage(logs);
  const todayMoney = calculateMoneySpent(todayLogs, settings.cigarettePrice);
  const weekMoney = calculateMoneySpent(weekLogs, settings.cigarettePrice);
  const monthMoney = calculateMoneySpent(monthLogs, settings.cigarettePrice);

  // Calculate days since start
  const startDate = new Date(settings.startDate);
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <GradientText
          colors={['#40ffaa', '#4079ff', '#40ffaa']}
          style={styles.title}
        >
          Your Progress
        </GradientText>
        
        {/* Daily Average */}
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Daily Average</Text>
          </View>
          <Text style={styles.cardValue}>{dailyAverage}</Text>
          <Text style={styles.cardSubtitle}>cigarettes per day</Text>
        </LinearGradient>

        {/* Today's Stats */}
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today</Text>
          </View>
          <Text style={styles.cardValue}>{todayLogs.length}</Text>
          <Text style={styles.cardSubtitle}>cigarettes</Text>
          <View style={styles.moneyContainer}>
            <Text style={styles.moneyLabel}>Cost: </Text>
            <Text style={styles.moneyValue}>MVR {todayMoney}</Text>
          </View>
        </LinearGradient>

        {/* This Week */}
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>This Week</Text>
          </View>
          <Text style={styles.cardValue}>{weekLogs.length}</Text>
          <Text style={styles.cardSubtitle}>cigarettes</Text>
          <View style={styles.moneyContainer}>
            <Text style={styles.moneyLabel}>Cost: </Text>
            <Text style={styles.moneyValue}>MVR {weekMoney}</Text>
          </View>
        </LinearGradient>

        {/* This Month */}
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>This Month</Text>
          </View>
          <Text style={styles.cardValue}>{monthLogs.length}</Text>
          <Text style={styles.cardSubtitle}>cigarettes</Text>
          <View style={styles.moneyContainer}>
            <Text style={styles.moneyLabel}>Cost: </Text>
            <Text style={styles.moneyValue}>MVR {monthMoney}</Text>
          </View>
        </LinearGradient>

        {/* Total Stats */}
        <LinearGradient
          colors={['#2a1a40', '#1a2a40']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, styles.highlightCard]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>All Time</Text>
          </View>
          <Text style={styles.cardValue}>{logs.length}</Text>
          <Text style={styles.cardSubtitle}>total cigarettes logged</Text>
          <View style={styles.moneyContainer}>
            <Text style={styles.moneyLabel}>Total Cost: </Text>
            <Text style={styles.moneyValue}>
              MVR {calculateMoneySpent(logs, settings.cigarettePrice)}
            </Text>
          </View>
        </LinearGradient>

        {/* Tracking Duration */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={['#1a2a3a', '#2a1a3a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.infoGradient}
          >
            <Text style={styles.infoText}>
              📊 You've been tracking for {daysSinceStart} {daysSinceStart === 1 ? 'day' : 'days'}
            </Text>
          </LinearGradient>
        </View>

        {/* Progress Message */}
        {logs.length > 0 && (
          <View style={styles.motivationCard}>
            <LinearGradient
              colors={['#1a3a2a', '#2a3a1a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.motivationGradient}
            >
              <Text style={styles.motivationTitle}>💪 Keep Going!</Text>
              <Text style={styles.motivationText}>
                {dailyAverage < settings.dailyGoal 
                  ? `Great job! You're averaging ${dailyAverage} cigarettes per day, below your goal of ${settings.dailyGoal}.`
                  : `You're averaging ${dailyAverage} cigarettes per day. Try to stay below your goal of ${settings.dailyGoal}.`
                }
              </Text>
            </LinearGradient>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  highlightCard: {
    borderColor: '#40ffaa',
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#40ffaa',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  moneyContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  moneyLabel: {
    fontSize: 16,
    color: '#888',
  },
  moneyValue: {
    fontSize: 16,
    color: '#4079ff',
    fontWeight: '600',
  },
  infoCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  infoGradient: {
    padding: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#40ffaa',
  },
  motivationCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  motivationGradient: {
    padding: 20,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40ffaa',
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
});