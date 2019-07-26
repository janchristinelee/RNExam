import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogIn from './src/LogIn';


const MainStack = createStackNavigator({
  LogIn: {
    screen: LogIn,
  }
},
  {
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      gesturesEnabled: false
    }
  }
)

export default createAppContainer(MainStack)
