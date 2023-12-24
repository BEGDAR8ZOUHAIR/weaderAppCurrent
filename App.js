import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';

export default function App()
{
    return (
        <View style={styles.container}>
            <Home />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



