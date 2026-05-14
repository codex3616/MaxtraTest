import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/bottom/Home';
import Profile from '../screens/bottom/Profile';

const Bottom = createBottomTabNavigator();
const Main = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Bottom.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
