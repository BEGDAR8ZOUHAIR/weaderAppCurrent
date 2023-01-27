import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet ,TouchableOpacity } from 'react-native';

const Register = ({ navigation }) =>
{
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const onSubmit = () =>
  {
    // handle registration logic
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 30,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    // margin: 10,

  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    padding: 8,
    borderRadius: 5,
    
  },
  button: {
    backgroundColor: 'darkslateblue',
    marginTop: 15,
    color: 'tomato',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5
  },
 
});

export default Register;
