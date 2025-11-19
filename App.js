import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SmokeProvider } from './src/context/SmokeContext';

export default function App() {
  return (
    <SmokeProvider>
      <AppNavigator />
    </SmokeProvider>
  );
}