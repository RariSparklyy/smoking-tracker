import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import GradientText from '../components/GradientText';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

// Custom header component with gradient text
const GradientHeader = ({ title }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <GradientText
      colors={['#40ffaa', '#4079ff', '#40ffaa']}
      style={{ fontSize: 20, fontWeight: 'bold' }}
    >
      {title}
    </GradientText>
  </View>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Statistics') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#40ffaa',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#0a0a0a',
            borderTopColor: '#1a1a1a',
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: '#0a0a0a',
            borderBottomColor: '#1a1a1a',
            borderBottomWidth: 1,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerTitle: () => <GradientHeader title="Puffless" />,
          }}
        />
        <Tab.Screen 
          name="Statistics" 
          component={StatisticsScreen}
          options={{
            headerTitle: () => <GradientHeader title="Statistics" />,
          }}
        />
        <Tab.Screen 
          name="History" 
          component={HistoryScreen}
          options={{
            headerTitle: () => <GradientHeader title="History" />,
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            headerTitle: () => <GradientHeader title="Settings" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}