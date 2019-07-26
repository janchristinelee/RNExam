import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import MovieDetails from './MovieDetails';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            gesturesEnabled: false,
            headerLeft: (<View></View>),
            headerRight: (
                <View></View>
            ),
            headerTitle: (
                <Text style={{ color: 'white', fontSize: 15 }}>Home</Text>
            ),
            headerTitleStyle: { textAlign: 'center', flex: 1 },
            headerStyle: {
                backgroundColor: '#40475b',
                shadowColor: '#000000',
                shadowOpacity: 0.5,
                shadowRadius: 3,
                elevation: 3,
                shadowOffset: {
                    height: 1,
                    width: 0
                },
                borderBottomWidth: 0
            }
        })
    },
    MovieDetails: {
        screen: MovieDetails,
        navigationOptions: ({ navigation }) => ({
            gesturesEnabled: false,
            headerLeft: (
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10, fontWeight: 'bold' }}>Back</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <View></View>
            ),
            headerTitle: (
                <Text style={{ color: 'white', fontSize: 15 }}>Movie Details</Text>
            ),
            headerTitleStyle: { textAlign: 'center', flex: 1 },
            headerStyle: {
                backgroundColor: '#40475b',
                shadowColor: '#000000',
                shadowOpacity: 0.5,
                shadowRadius: 3,
                elevation: 3,
                shadowOffset: {
                    height: 1,
                    width: 0
                },
                borderBottomWidth: 0
            }
        })
    }
})

export default createAppContainer(HomeStack);