import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Alert, ScrollView, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Moment from 'moment';
import { EvilIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as Location from 'expo-location'
import axios from 'axios'
import SunIcon from '../../assets/3.jpg';
import { API_KEY } from '../utils/weatherApiKey';

const Home = () =>
{
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState({})  
   
   
    const getCurentWeather = async () =>
    {
        try
        {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted')
            {
                Alert.alert('Permission to access location was denied'); // if permission is denied , show alert
                // return;
            }
            // get location
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}`)
            setWeather(response.data)
            console.log(response.data)
        } catch (error)
        {
            Alert.alert(
                'Hello',
                ' this city does not exist'
            );
        }
    }
    useEffect(() =>
    {
        getCurentWeather()
    }, [])

    const getWeather = async () =>
    {
        if (!city.trim()) return

        try
        {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            setWeather(response.data)
        } catch (error)
        {
            Alert.alert(
                'Hello',
                ' this city does not exist'
            );
        }
    }
    return (
        <ImageBackground source={SunIcon} style={styles.image} >
            <SafeAreaView >
                
                <View style={styles.container}>

                    <TextInput
                        style={styles.textInput}
                        value={city}
                        placeholder="Search"
                        onChangeText={(text) => setCity(text)}
                    />
                    <EvilIcons
                        style={styles.icon}
                        onPress={getWeather}
                        name="check"
                        size={35}
                        color="black" />
                    </View>
                
                {Object.keys(weather).length > 0 ?
                    <>
                        
                        <View style={styles.dateContainer} >
                            <Text style={styles.dateContainer} >{new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })}  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                            <Text>{Math.round(weather?.main?.temp_max - 273.15)}°</Text>
                            <Ionicons name="sunny-outline" size={20} color="black" />
                            <Text>{Math.round(weather?.main?.temp_min - 273.15)}° </Text>
                            <Ionicons name="cloudy-night-outline" size={20} color="black" />
                        </View>
                        <View style={styles.locationContainer} >
                            <Text style={styles.locationContainer} >{weather?.name}</Text>
                            <Ionicons name="ios-location-outline" size={24} color="black" />
                        </View>
                        <View style={styles.weatherContainer} >
                            <Text style={styles.temp} >{Math.round(weather?.main?.temp - 273.15)}°</Text>
                            <Text style={styles.typeWeather}>{weather?.weather[0]?.main}</Text>
                        </View>
                        <View style={styles.humidity} >
                            <Text style={styles.humidity}>Humidity</Text>
                            <Text style={styles.humidity}>{weather?.main?.humidity}%</Text>
                            <MaterialCommunityIcons name="water-outline" size={24} color="black" />
                        </View>
                        <View style={styles.wind} >
                            <Text style={styles.wind}>Wind</Text>
                            <Text style={styles.wind}>{weather?.wind?.speed}km</Text>
                            <MaterialCommunityIcons name="wind-turbine" size={24} color="black" />
                        </View>
                        <View>
                            <FlatList
                                data={weather?.weather}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) =>
                                {
                                    return (
                                        <View style={styles.forecastContainer} >
                                            <Text style={styles.forecastContainer} >{Moment(item.dt_txt).format('HH:mm')}</Text>
                                            <Text style={styles.forecastContainer} >{item.description}</Text>
                                            <Image
                                                source={{ uri: `http://openweathermap.org/img/w/${item.icon}.png`}}
                                            style={styles.forecastImage}
                                            />
                                        </View>
                                    )
                                }
                                }
                                />
                                        
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
    container: {
        marginVertical: 50,
        position: 'relative',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        right: 40,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    dateContainer: {
        alignItems: 'center',
        fontSize: 20,
        color : 'darkslateblue'
    },
    textInput: {
        width: 300,
        height: 50,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        borderRadius: 10,

    },
    locationContainer: {
        marginVertical: 15,
        alignItems: 'center',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    weatherContainer: {
        color: 'black',
        alignItems: 'center',

    },
    temp: {
        fontSize: 80,
        justifyContent: 'center',
        alignItems: 'center',


    },
    typeWeather: {
        fontSize: 25,
        marginHorizontal: 5,
        alignItems: 'center',
        flexDirection: 'row',
       
    },
    humidity: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around', 
        marginTop: 10,
    },
    wind: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    day: {
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    forecastContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontSize: 20,
    },
    forecastImage: {
        width: 50,
        height: 50,
    }


});

export default Home