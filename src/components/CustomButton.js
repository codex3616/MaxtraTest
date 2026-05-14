import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: 48,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
