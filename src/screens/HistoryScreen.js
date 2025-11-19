import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSmoke } from '../context/SmokeContext';
import { formatTime, formatDate } from '../utils/calculations';

export default function HistoryScreen() {
  const { logs, removeLog } = useSmoke();

  const handleDelete = (log) => {
    Alert.alert(
      'Delete Log',
      `Remove cigarette logged at ${formatTime(log.timestamp)}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await removeLog(log.id);
            if (!success) {
              Alert.alert('Error', 'Failed to delete log. Please try again.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.logItem}>
      <View style={styles.logIcon}>
        <Text style={styles.logIconText}>🚬</Text>
      </View>
      
      <View style={styles.logInfo}>
        <Text style={styles.logTime}>{formatTime(item.timestamp)}</Text>
        <Text style={styles.logDate}>{formatDate(item.timestamp)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No logs yet</Text>
      <Text style={styles.emptyText}>
        Start tracking by logging your first cigarette from the Home screen.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {logs.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Total Logs: {logs.length}</Text>
        </View>
      )}
      
      <FlatList
        data={logs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={logs.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  list: {
    padding: 20,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logIconText: {
    fontSize: 24,
  },
  logInfo: {
    flex: 1,
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
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});