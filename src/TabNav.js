import React, { Component } from 'react';
import { View, Text, FlatList, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import WatchListStack from './WatchListStack';
import HomeStack from './HomeStack';

const BottomTabNavigator = createBottomTabNavigator({
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarLabel: <View />,
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('../images/Home.png')} style={{ height: 25, width: 25, tintColor: tintColor }} />
            )
        }
    },
    WatchListStack: {
        screen: WatchListStack,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarLabel: <View />,
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('../images/WatchList.png')} style={{ height: 25, width: 25, tintColor: tintColor }} />
            )
        }
    }
},
    {
        tabBarOptions: {
            activeTintColor: '#27CCC0',
            inactiveTintColor: '#b2b2b2',
            style: {
                backgroundColor: '#212530'
            }
        }
    });

export default createAppContainer(BottomTabNavigator);