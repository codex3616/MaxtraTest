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
import { decode, encode } from 'base-64';

const Login = () => {
  const navigation = useNavigation();
  const [error, setError] = useState('');

  return (
    <SafeAreaProvider style={styles.conatainer}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
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
            const storedUser = await AsyncStorage.getItem('user');

            if (!storedUser) {
              setError('No account found. Please sign up first.');
              return;
            }

            const parsedUser = JSON.parse(storedUser);

            if (parsedUser.email !== values.email) {
              setError('Email not found.');
              return;
            }

            //pswrd decode
            const decodedPassword = decode(parsedUser.password);
            if (decodedPassword !== values.password) {
              setError('Incorrect password.');
              return;
            }

            //token gen
            const token = uuid.v4();
            const encodedToken = encode(token);
            await AsyncStorage.setItem('token', encodedToken);
            console.log('login success, token saved:', encodedToken);

            Alert.alert('Success', 'Login successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Main'),
              },
            ]);
          } catch (err) {
            console.log('error', err);
            setError('Something went wrong. Please try again.');
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
              <Text style={styles.title}>Login</Text>
              <TextInput
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={txt => {
                  setFieldValue('email', txt);
                  setError('');
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
                  setError('');
                }}
                placeholder="Enter Password"
                placeholderTextColor={'#999'}
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

              {error && (
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: 15,
                    fontSize: 14,
                    paddingLeft: 25,
                  }}
                >
                  {error}
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
                <Text style={styles.btnTxt}>Login</Text>
              </TouchableOpacity>

              <Text
                style={styles.signUpTxt}
                onPress={() => {
                  navigation.navigate('Signup');
                }}
              >
                Or Create New Account <Text style={styles.signup}>Sign Up</Text>
              </Text>
            </View>
          );
        }}
      </Formik>
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 200,
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
  signUpTxt: {
    alignSelf: 'center',
    marginTop: 20,
  },
  signup: {
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
