import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { EvilIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
import SunIcon from '../../assets/2.png';

// <MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />

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
        <ImageBackground source={SunIcon} style={styles.image} >
        <SafeAreaView >
            <View style={styles.textInputContainer}>

                <TextInput
                    style={styles.textInput}
                    value={city}
                    placeholder="Search"
                    onChangeText={(text) => setCity(text)}
                />
                 <EvilIcons
                    onPress={getWeather}
                    name="check"
                    size={24}
                    color="black" />
            </View>

            {Object.keys(weather).length > 0 ? 
                <>
            <View style={styles.locationContainer} >
                            <Text style={styles.locationContainer} >{weather?.name}</Text>
                            <Ionicons name="ios-location-outline" size={24} color="black" />
            </View>
                
            <View style={styles.weatherContainer} >
                     <Text style={styles.temp} >{Math.round(weather?.main?.temp - 273.15)}°C</Text>
                        <Text style={styles.weather} >{weather.weather?.[0].main}</Text>   
                        <View style={styles.textInputContainer}>

                            {/* <MaterialCommunityIcons name="weather-rainy" size={55} color="#fff" />  */}
                        </View>
                       
                    </View>
                </>
                : null}
        </SafeAreaView>
     </ImageBackground>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    textInputContainer: {
        backgroundColor: '#F8EDE3',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        textShadowColor: 'black',
        
       
    },
    textInput: {
        height: 40,
    },
    locationContainer: {
        marginVertical: 15,
        alignItems: 'center',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    locationText: {

        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    weatherContainer: { 
        alignItems: 'center',
    },
    temp: {
        textAlign: 'center',
        color: 'black',
        fontSize: 40,
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
        overflow: 'hidden',
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 5,
    },
    weather: {
        fontSize: 30,
        color: 'black',
        textShadowRadius: 5,
    },

});

export default Home