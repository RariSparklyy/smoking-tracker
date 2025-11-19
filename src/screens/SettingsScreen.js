import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Modal } from 'react-native';
import { useSmoke } from '../context/SmokeContext';

export default function SettingsScreen() {
  const { settings, updateSettings, resetAllData } = useSmoke();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'price' or 'goal'
  const [inputValue, setInputValue] = useState('');

  const openModal = (type) => {
    setModalType(type);
    if (type === 'price') {
      setInputValue(settings.cigarettePrice.toString());
    } else if (type === 'goal') {
      setInputValue(settings.dailyGoal.toString());
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    const value = parseFloat(inputValue);
    
    if (isNaN(value) || value <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid positive number.');
      return;
    }

    if (modalType === 'price') {
      await updateSettings({ cigarettePrice: value });
      Alert.alert('Success', 'Cigarette price updated!');
    } else if (modalType === 'goal') {
      await updateSettings({ dailyGoal: Math.round(value) });
      Alert.alert('Success', 'Daily goal updated!');
    }

    setModalVisible(false);
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to delete all logged cigarettes? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            const success = await resetAllData();
            if (success) {
              Alert.alert('Success', 'All data has been reset.');
            } else {
              Alert.alert('Error', 'Failed to reset data.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => openModal('price')}
          >
            <Text style={styles.settingLabel}>Cigarette Price</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>MVR {settings.cigarettePrice.toFixed(2)}</Text>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => openModal('goal')}
          >
            <Text style={styles.settingLabel}>Daily Goal</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{settings.dailyGoal} cigarettes</Text>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, styles.dangerItem]}
            onPress={handleResetData}
          >
            <Text style={styles.dangerText}>Reset All Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Smoke Tracker helps you monitor your smoking habits and work towards quitting.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>

      {/* Modal for editing values */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === 'price' ? 'Edit Cigarette Price' : 'Edit Daily Goal'}
            </Text>
            
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              placeholder={modalType === 'price' ? 'Enter price in MVR' : 'Enter number of cigarettes'}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingValue: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  editIcon: {
    fontSize: 18,
  },
  dangerItem: {
    backgroundColor: '#FFE5E5',
  },
  dangerText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  version: {
    fontSize: 12,
    color: '#999',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});