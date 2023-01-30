
import React, { useState, useEffect } from 'react';
import { View, TextInput,  Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import logo from '../../assets/01.png'
const Login = ({ navigation }) =>
{
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () =>
  {
    // handle login logic
    navigation.navigate('Home');
  };

   
  

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.image}
      />
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Username"
        onChangeText={(username) => setUsername(username)}

      />
      <Text style={styles.label}></Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}

      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Login</Text>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  }, 
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "darkslateblue",
    marginTop: 15,
    color: 'tomato',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5
  },
});

export default Login;
