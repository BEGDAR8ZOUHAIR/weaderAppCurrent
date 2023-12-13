import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Alert, ScrollView, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Moment from 'moment';
import { EvilIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as Location from 'expo-location'
import axios from 'axios'
import SunIcon from '../assets/dashboard.png';
import { API_KEY } from '../../mobile/utils/weatherApiKey';

const hours = ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00', '03:00', '06:00'];

const Home = () =>
{
    const [city, setCity] = useState('Safi')
    const [weather, setWeather] = useState({})
    const [weatherData, setWeatherData] = useState([])



    // get weather for current  loaction =====================================================

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

    // get weather for searched city =====================================================
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
    //  get weather for each hour =====================================================
    const getWeatherForHour = async (hour) =>
    {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        setWeatherData(prevData => [...prevData, { hour, weather: response.data }]);

    };

    const fetchWeatherData = async () =>
    {
        setWeatherData([])
        hours.forEach(async (hour) => await getWeatherForHour(hour));
    };

    useEffect(() =>
    {
        fetchWeatherData();
    }, [city]);

    // ===================================================================================

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
                            <Ionicons name="ios-location-outline" size={24} color="#fff" />
                        </View>
                        <View style={styles.weatherContainer} >
                            <Text style={styles.temp} >{Math.round(weather?.main?.temp - 273.15)}°C</Text>
                            
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

                        {/* <View style={styles.hr} /> */}
                        <FlatList
                            extraData={weatherData}
                            removeClippedSubviews={false}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={weatherData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                            {
                                return (
                                    <View style={styles.hourContainer} >
                                        <Text style={styles.hour} >{item.hour}</Text>
                                        <Text style={styles.hour} >{Math.round(item.weather?.main?.temp - 273.15)}°C</Text>
                                        <Image
                                            style={styles.hourIcon}
                                            source={{ uri: `http://openweathermap.org/img/wn/${item.weather?.weather[0]?.icon}.png` }}
                                        />
                                    </View>
                                )
                            }}
                        />
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
        color: '#fff',

    },
    textInput: {
        width: 300,
        height: 50,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    locationContainer: {
        marginVertical: 15,
        alignItems: 'center',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#fff',
    },
    weatherContainer: {
        color: '#fff',
        alignItems: 'center',
    },
    temp: {
        fontSize: 100,
        color: '#fff',
        alignItems: 'center',
        // shadow of text
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 5

    },
    typeWeather: {
        fontSize: 25,
        marginHorizontal: 5,
        alignItems: 'center',
        flexDirection: 'row',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 5
    },
    humidity: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        color: '#fff',

    },
    wind: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: '#fff',
    },
    day: {
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    hourContainer: {
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginVertical: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 50,
        // shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    hour: {
        marginHorizontal: 5,
        textAlign: 'center',
    },
    hourIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 20,
    },

});

export default Home