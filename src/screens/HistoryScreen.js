import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Animated } from 'react-native';
import { useSmoke } from '../context/SmokeContext';
import { formatTime, formatDate } from '../utils/calculations';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

// Simple animated list item component
const AnimatedLogItem = ({ item, onDelete, delay = 0 }) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [scaleAnim] = React.useState(new Animated.Value(0.8));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        friction: 8,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.logItem,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.logIcon}>
        <Feather name="wind" size={24} color="#40ffaa" />
      </View>
      
      <View style={styles.logInfo}>
        <Text style={styles.logTime}>{formatTime(item.timestamp)}</Text>
        <Text style={styles.logDate}>{formatDate(item.timestamp)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(item)}
      >
        <Feather name="trash-2" size={18} color="#ff6b6b" />
      </TouchableOpacity>
    </Animated.View>
  );
};

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

  const renderItem = ({ item, index }) => (
    <AnimatedLogItem 
      item={item} 
      onDelete={handleDelete}
      delay={index * 50} // Stagger animation
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="file-text" size={60} color="#333" style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>No logs yet</Text>
      <Text style={styles.emptyText}>
        Start tracking by logging your first cigarette from the Home screen.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {logs.length > 0 && (
        <LinearGradient
          colors={['#1a1a1a', '#0a0a0a']}
          style={styles.header}
        >
          <Text style={styles.headerText}>Total Logs: {logs.length}</Text>
        </LinearGradient>
      )}
      
      {/* Gradient overlay at top */}
      {logs.length > 0 && (
        <LinearGradient
          colors={['#0a0a0a', 'transparent']}
          style={styles.topGradient}
          pointerEvents="none"
        />
      )}
      
      <FlatList
        data={logs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={logs.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmpty}
      />

      {/* Gradient overlay at bottom */}
      {logs.length > 5 && (
        <LinearGradient
          colors={['transparent', '#0a0a0a']}
          style={styles.bottomGradient}
          pointerEvents="none"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#40ffaa',
    textAlign: 'center',
  },
  topGradient: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 10,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 10,
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
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  logIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  // logIconText removed
  logInfo: {
    flex: 1,
  },
  logTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  // deleteButtonText removed
  emptyContainer: {
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
});