import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Count</Text>
      <Text style={styles.count}>0</Text>
      <Text style={styles.subtitle}>cigarettes</Text>
      
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logButtonText}>Log Smoke</Text>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>MVR 0.00</Text>
          <Text style={styles.statLabel}>Money Spent</Text>
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
});