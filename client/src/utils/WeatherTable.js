import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import DataTable from 'react-native-data-table';
import Moment from 'moment';

const WeatherTable = (props) =>
{
    const [forecastData, setForecastData] = useState(props.forecastData);

    return (
        <View>
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.headerTitle}>Time</DataTable.Title>
                        <DataTable.Title style={styles.headerTitle}>Temperature</DataTable.Title>
                        <DataTable.Title style={styles.headerTitle}>Humidity</DataTable.Title>
                        <DataTable.Title style={styles.headerTitle}>Description</DataTable.Title>
                    </DataTable.Header>
                    {forecastData && forecastData.list.map((item, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={styles.cell}>{Moment(item.dt_txt).format('HH:mm')}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{Math.round(item.main.temp - 273.15)} °C</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.main.humidity} %</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.weather[0].description}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        </View>
    );
};

export default WeatherTable;