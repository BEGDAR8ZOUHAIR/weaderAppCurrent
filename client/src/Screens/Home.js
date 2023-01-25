import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
// import SunIcon from './assets/sun.svg';

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
            console.log("data :::",response.data)
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

            {Object.keys(weather).length > 0 ? 
                <>
            <View style={styles.locationContainer} >
                <Text style={styles.locationText} >{weather?.name} ,{weather?.sys?.country}</Text>

            </View>
            <View style={styles.weatherContainer} >
                     <Text style={styles.temp} >{Math.round(weather?.main?.temp - 273.15)}°C</Text>
                        <Text style={styles.weather} >{weather.weather?.[0].main}</Text>   
                        <View style={styles.textInputContainer}>

                            <MaterialCommunityIcons name="weather-rainy" size={55} color="#fff" /> 
                        </View>
                       
                    </View>
                </>
                : null}
        </SafeAreaView>
        //  </ImageBackground>
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
    },
    locationContainer: {
        flex: 1,
        marginVertical: 15,
    },
    locationText: {
        fontSize: 35,
        color: '#fff',
        // fontWeight: 'bold',
        // textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.45)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    weatherContainer: { 
        flex: 1,
        alignItems: 'center',
    },
    temp: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 50,
        // fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        overflow: 'hidden',
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 5,
    },
    weather: {
        fontSize: 30,
        color: '#fff',
        // fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },

});

export default Home