import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Modal } from 'react-native';
import { useSmoke } from '../context/SmokeContext';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../components/GradientText';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { settings, updateSettings, resetAllData } = useSmoke();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
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
        {/* Preferences Section */}
        <View style={styles.section}>
          <GradientText
            colors={['#40ffaa', '#4079ff', '#40ffaa']}
            style={styles.sectionTitle}
          >
            Preferences
          </GradientText>
          
          <TouchableOpacity 
            onPress={() => openModal('price')}
          >
            <LinearGradient
              colors={['#1a1a1a', '#2a2a2a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.settingItem}
            >
              <Text style={styles.settingLabel}>Cigarette Price</Text>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>MVR {settings.cigarettePrice.toFixed(2)}</Text>
                <Feather name="edit-2" size={18} color="#666" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => openModal('goal')}
          >
            <LinearGradient
              colors={['#1a1a1a', '#2a2a2a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.settingItem}
            >
              <Text style={styles.settingLabel}>Daily Goal</Text>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>{settings.dailyGoal} cigarettes</Text>
                <Feather name="edit-2" size={18} color="#666" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <GradientText
            colors={['#ff6b6b', '#ff4040', '#ff6b6b']}
            style={styles.sectionTitle}
          >
            Data
          </GradientText>
          
          <TouchableOpacity onPress={handleResetData}>
            <LinearGradient
              colors={['#2a1a1a', '#3a1a1a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.settingItem, styles.dangerItem]}
            >
              <Text style={styles.dangerText}>Reset All Data</Text>
              <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <GradientText
            colors={['#40ffaa', '#4079ff', '#40ffaa']}
            style={styles.sectionTitle}
          >
            About
          </GradientText>
          
          <LinearGradient
            colors={['#1a1a1a', '#2a2a2a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aboutCard}
          >
            <Text style={styles.aboutText}>
              Puffless helps you monitor your smoking habits and work towards quitting.
            </Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </LinearGradient>
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
          <LinearGradient
            colors={['#1a1a1a', '#2a2a2a']}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>
              {modalType === 'price' ? 'Edit Cigarette Price' : 'Edit Daily Goal'}
            </Text>
            
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              placeholder={modalType === 'price' ? 'Enter price in MVR' : 'Enter number of cigarettes'}
              placeholderTextColor="#666"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonWrapper}
                onPress={() => setModalVisible(false)}
              >
                <LinearGradient
                  colors={['#2a2a2a', '#3a3a3a']}
                  style={styles.modalButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalButtonWrapper}
                onPress={handleSave}
              >
                <LinearGradient
                  colors={['#40ffaa', '#4079ff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.modalButton}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  settingLabel: {
    fontSize: 16,
    color: '#ccc',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingValue: {
    fontSize: 16,
    color: '#40ffaa',
    fontWeight: '600',
  },
  dangerItem: {
    borderColor: '#ff6b6b',
  },
  dangerText: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '600',
  },
  aboutCard: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  aboutText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 10,
  },
  version: {
    fontSize: 12,
    color: '#666',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 20,
    padding: 25,
    width: '85%',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButtonWrapper: {
    flex: 1,
  },
  modalButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  cancelButtonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});