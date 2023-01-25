// import React, { useState, useEffect } from 'react'
// import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl , Image } from 'react-native'
// import * as Location from 'expo-location'
// const openWeatherKey = '8674cd3c77c2530a4c88d0ed755315f6' 
// // let url = `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.9780&appid=${openWeatherKey}&units=metric`
// // let url = `api.openweathermap.org/data/2.5/forecast?id=524901&appid={openWeatherKey}`
// // let imageURI = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fweather_1779940&psig=AOvVaw3U6I9ungQZlN0GIcYc9uAS&ust=1674584200242000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLja-LSm3vwCFQAAAAAdAAAAABAE';

// const Weather = () =>
// {
// //     const [forcast, setForcast] = useState(null);
// //     const [refreshing, setRefreshing] = useState(false);

// //     const loadForcast = async () =>
// //     {
// //         setRefreshing(true);
// //         // assk for permission to access location
// //         const { status } = await Location.requestForegroundPermissionsAsync();
// //         if (status !== 'granted')
// //         {
// //             Alert.alert('Permission to access location was denied'); // if permission is denied , show alert
// //             // return;
// //         }
// //         // get location
// //         let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

// //         //  fetch weather data from openweather api
// //         const response = await fretch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
// //         const data = await response.json(); // convert response to json
// //         console.log("jjjjjjjjjjjjjjj",data);
// //         if (!response.ok)
// //         {
// //             Alert.alert('Error', 'Something went wrong'); // if response is not ok , show alert
// //             return;
// //         } else
// //         {
// //             setForcast(data);
// //         }
// //         setRefreshing(false);
// //     }

// //         // useEffect is a hook that runs when the component is mounted
// //         useEffect(() =>
// //         {
// //             loadForcast();
// //         }, []);

// //         if (!forcast)
// //         {
// //             return (
// //                 <SafeAreaView style={styles.loading}>
// //                     <ActivityIndicator size="large" />
// //                 </SafeAreaView>
// //             );
// //         }

        
// //         const current = forcast.current.Weather[0]; // get current weather

    

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView
//                 // refreshControl={
//                 //     <RefreshControl
//                 //         refreshing={refreshing}
//                 //         onRefresh={() => loadForcast()}
//                 //     />
//                 // }
//                 // style={{ marginTop: 50 }}
//             >
//                 <Text style={styles.title}>Weather current</Text>
//                 <Text style={styles.subtitle}>Your Location</Text>
//                 <View style={styles.weatherIcon}>
//                         <Image
//                             style={styles.weatherImage}
//                         source={{
//                             uri: imageURI,
//                             }}
//                         />
//                 </View>
//                 {/* <Text>
//                     {Math.round(forcast.current.temp)}°C
//                 </Text> */}
        
                            
//             </ScrollView>
//         </SafeAreaView>


//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'rgb(21,188,246)',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         textAlign: 'center',
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     subtitle: {
//         textAlign: 'center',
//         fontSize: 16,
//         color: '#fff',
//     },
//     weatherIcon: {
//         flexDirection: 'row',
//         // justifyContent: 'center',
//     },
//     weatherImage: {
//         width: 50,
//         height: 50,
//     },
// });

// export default Weather;