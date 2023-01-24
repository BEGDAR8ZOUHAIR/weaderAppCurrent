import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
// import ImageOne from '../../assets/02.svg'

const Home = () =>
{
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState({})  // this is an object that will hold the weather data
    const getWeather = async () =>
    {
        if (!city.trim()) return    
       
        try
        {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8674cd3c77c2530a4c88d0ed755315f6`)
            setWeather(response.data)
        } catch (error)
        {
            Alert.alert(
                'Hello',
                //body
                ' this city does not exist'
                
            );
        }
    }
    return (
        // <ImageBackground source={ImageOne} style={styles.image} >
        <SafeAreaView style={styles.backgroundColor}>
            <View style={styles.textInputContainer}>

                <TextInput
                    style={styles.textInput}
                    value={city}
                    placeholder="Search"
                    onChangeText={(text) => setCity(text)}
                />
                <AntDesign
                    onPress={getWeather}
                    name="checksquare"
                    size={50}
                    color="rgba(255,255,255,0.7)" />
            </View>


        </SafeAreaView>
        // </ImageBackground>
    )
}
const styles = StyleSheet.create({
    backgroundColor: {
        flex: 1,
        backgroundColor: 'rgb(21,188,246)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 40,
    },
    textInput: {
        height: 50,
        width: 250,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,


    }
});

export default Home