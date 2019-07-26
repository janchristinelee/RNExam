import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WatchList from './WatchList';

const WatchListStack = createStackNavigator({
    WatchList: {
        screen: WatchList,
        navigationOptions: ({ navigation }) => ({
            gesturesEnabled: false,
            headerLeft: (<View></View>),
            headerRight: (
                <View></View>
            ),
            headerTitle: (
                <Text style={{ color: 'white', fontSize: 15 }}>Watchlist</Text>
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

export default createAppContainer(WatchListStack);