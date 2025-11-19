import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSmoke } from '../context/SmokeContext';
import { getMonthLogs, calculateMoneySpent, calculateDailyAverage, getTodayLogs, getWeekLogs } from '../utils/calculations';

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
        <Text style={styles.title}>Your Progress</Text>
        
        {/* Daily Average */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Average</Text>
          <Text style={styles.cardValue}>{dailyAverage}</Text>
          <Text style={styles.cardSubtitle}>cigarettes per day</Text>
        </View>

        {/* Today's Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today</Text>
          <Text style={styles.cardValue}>{todayLogs.length}</Text>
          <Text style={styles.cardSubtitle}>cigarettes</Text>
          <Text style={styles.moneyText}>Cost: MVR {todayMoney}</Text>
        </View>

        {/* This Week */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week</Text>
          <Text style={styles.cardValue}>{weekLogs.length}</Text>
          <Text style={styles.cardSubtitle}>cigarettes</Text>
          <Text style={styles.moneyText}>Cost: MVR {weekMoney}</Text>
        </View>

        {/* This Month */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Month</Text>
          <Text style={styles.cardValue}>{monthLogs.length}</Text>
          <Text style={styles.cardSubtitle}>cigarettes</Text>
          <Text style={styles.moneyText}>Cost: MVR {monthMoney}</Text>
        </View>

        {/* Total Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>All Time</Text>
          <Text style={styles.cardValue}>{logs.length}</Text>
          <Text style={styles.cardSubtitle}>total cigarettes logged</Text>
          <Text style={styles.moneyText}>
            Total Cost: MVR {calculateMoneySpent(logs, settings.cigarettePrice)}
          </Text>
        </View>

        {/* Tracking Duration */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            📊 You've been tracking for {daysSinceStart} {daysSinceStart === 1 ? 'day' : 'days'}
          </Text>
        </View>

        {/* Progress Message */}
        {logs.length > 0 && (
          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>💪 Keep Going!</Text>
            <Text style={styles.motivationText}>
              {dailyAverage < settings.dailyGoal 
                ? `Great job! You're averaging ${dailyAverage} cigarettes per day, below your goal of ${settings.dailyGoal}.`
                : `You're averaging ${dailyAverage} cigarettes per day. Try to stay below your goal of ${settings.dailyGoal}.`
              }
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  moneyText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
  },
  motivationCard: {
    backgroundColor: '#F1F8E9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#8BC34A',
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#558B2F',
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 14,
    color: '#558B2F',
    lineHeight: 20,
  },
});