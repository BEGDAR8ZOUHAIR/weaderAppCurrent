import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './src/Screens/Home';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

  // options={{headerShown: false}}  after screen
const HomeStack = () =>

{
  return (
    <Stack.Navigator>
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen  name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
          {
            let iconName;

            if (route.name === 'Home')
            {
            //  icons of page home 
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Login')
            {
              // icons of login
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Register')
            {
              // icons of register
              iconName = focused ? 'person-add' : 'person-add-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator> 
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'center'
  },
});
 