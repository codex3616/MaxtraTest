import { StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <AppNavigator />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
