import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function StatisticsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Progress</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Average</Text>
          <Text style={styles.cardValue}>0</Text>
          <Text style={styles.cardSubtitle}>cigarettes per day</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Logged</Text>
          <Text style={styles.cardValue}>0</Text>
          <Text style={styles.cardSubtitle}>cigarettes this month</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Money Spent</Text>
          <Text style={styles.cardValue}>MVR 0.00</Text>
          <Text style={styles.cardSubtitle}>this month</Text>
        </View>
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
});