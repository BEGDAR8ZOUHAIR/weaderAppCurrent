import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Screens/Home';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () =>
{
    LogBox.ignoreLogs(['Remote debugger']);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};


export default function App()
{
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) =>
                    {
                        let iconName;

                        if (route.name === 'Home')
                        {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Login')
                        {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Register')
                        {
                            iconName = focused ? 'person-add' : 'person-add-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'darkslateblue',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});

