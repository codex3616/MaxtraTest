import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { encode } from 'base-64';

const Signup = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider style={styles.conatainer}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, 'name is to short')
            .required('name is required'),
          email: Yup.string()
            .email('enter valid email')
            .required('email is required'),
          password: Yup.string()
            .min(3, 'Password is to short')
            .max(15, 'Password too lengthy')
            .required('Password is required'),
        })}
        onSubmit={async values => {
          try {
            const userData = {
              id: uuid.v4(),
              name: values.name,
              email: values.email,
              password: encode(values.password),
              createdAt: new Date().toISOString(),
            };

            await AsyncStorage.setItem('user', JSON.stringify(userData));
            console.log('user saved', userData);
            Alert.alert('Success', 'Account created successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
              },
            ]);
          } catch (error) {
            console.log('error saving user', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
          }
        }}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          errors,
          dirty,
          isValid,
          touched,
          handleBlur,
        }) => {
          return (
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Create new account</Text>

              <TextInput
                value={values.name}
                onBlur={handleBlur('name')}
                onChangeText={txt => {
                  setFieldValue('name', txt);
                }}
                placeholder="Enter your name"
                placeholderTextColor={'#999'}
                style={styles.input}
              />
              {touched.name && errors.name && (
                <Text
                  style={{ color: 'red', marginBottom: 15, paddingLeft: 25 }}
                >
                  {errors.name}
                </Text>
              )}

              <TextInput
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={txt => {
                  setFieldValue('email', txt);
                }}
                placeholder="Enter Email"
                placeholderTextColor={'#999'}
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text
                  style={{ color: 'red', marginBottom: 15, paddingLeft: 25 }}
                >
                  {errors.email}
                </Text>
              )}
              <TextInput
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={txt => {
                  setFieldValue('password', txt);
                }}
                placeholderTextColor={'#999'}
                placeholder="Enter Password"
                style={styles.input}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text
                  style={{ color: 'red', marginBottom: 15, paddingLeft: 25 }}
                >
                  {errors.password}
                </Text>
              )}

              <TouchableOpacity
                disabled={dirty && !isValid}
                style={[
                  styles.btn,
                  { backgroundColor: dirty && !isValid ? 'gray' : 'blue' },
                ]}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTxt}>Signup</Text>
              </TouchableOpacity>

              <Text
                style={styles.loginTxt}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                Already have an account? <Text style={styles.login}>Login</Text>
              </Text>
            </View>
          );
        }}
      </Formik>
    </SafeAreaProvider>
  );
};

export default Signup;
const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 150,
    marginBottom: 30,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    height: 48,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 20,
    color: '#000',
  },
  loginTxt: {
    alignSelf: 'center',
    marginTop: 20,
  },
  login: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: '600',
    color: 'blue',
  },
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
