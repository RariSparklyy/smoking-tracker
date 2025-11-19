import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function HistoryScreen() {
  // Dummy data for now
  const dummyData = [
    { id: '1', time: '2:30 PM', date: 'Today' },
    { id: '2', time: '11:15 AM', date: 'Today' },
    { id: '3', time: '9:00 AM', date: 'Today' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.logItem}>
      <View>
        <Text style={styles.logTime}>{item.time}</Text>
        <Text style={styles.logDate}>{item.date}</Text>
      </View>
      <View style={styles.logIcon}>
        <Text style={styles.logIconText}>🚬</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 20,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logIconText: {
    fontSize: 20,
  },
});