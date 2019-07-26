import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StatusBar, Keyboard } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeStack from './HomeStack';
import { Params } from './GlobalParameters';
import TabNav from './TabNav';

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            UNValue: '',
            PWValue: '',
            request_token: ''
        }
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=b8f6659663a445615ffcfc2c4c637c4a')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ request_token: responseJson.request_token })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    logIn = () => {
        fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=b8f6659663a445615ffcfc2c4c637c4a', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": this.state.UNValue,
                "password": this.state.PWValue,
                "request_token": this.state.request_token
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {
                fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=b8f6659663a445615ffcfc2c4c637c4a', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "request_token": responseJson.request_token
                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        Params.authorizedToken = responseJson.session_id
                        this.props.navigation.navigate('Home')
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#2B303E' barStyle="light-content" />
                <Image source={require('../images/film.png')} style={{ height: 80, width: 80, tintColor: '#FF2C66', marginBottom: 10 }} />
                <Text style={{ fontSize: 20, color: '#FF2C66', marginBottom: 65 }}>THE MOVIE DB</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ UNValue: text })}
                    value={this.state.UNValue}
                    placeholder={'USERNAME'}
                    placeholderTextColor={'#19726b'}
                    onSubmitEditing={() => { this.pwTextInput.focus(); }}
                />
                <TextInput
                    ref={(input) => { this.pwTextInput = input; }}
                    style={{ width: 300, height: 35, borderColor: '#27CCC0', borderBottomWidth: 1, color: '#27CCC0', fontSize: 15, marginVertical: 10 }}
                    onChangeText={(text) => this.setState({ PWValue: text })}
                    value={this.state.PWValue}
                    secureTextEntry={true}
                    placeholder={'PASSWORD'}
                    placeholderTextColor={'#19726b'}
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                />
                <TouchableOpacity style={{ backgroundColor: '#27CCC0', height: 60, width: 300, alignItems: 'center', justifyContent: 'center', marginTop: 60, borderRadius: 10 }} onPress={() => { this.logIn() }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>LOG IN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const LogInStack = createStackNavigator({
    LogIn: {
        screen: LogIn,
        navigationOptions: ({ navigation }) => ({
            header: null,
            gesturesEnabled: false
        })
    },
    TabNav: {
        screen: TabNav,
        navigationOptions: ({ navigation }) => ({
            header: null,
            gesturesEnabled: false
        })
    }
})

export default createAppContainer(LogInStack);

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2B303E',
        paddingTop: 100
    },
    textInput: {
        width: 300,
        height: 35,
        borderColor: '#27CCC0',
        borderBottomWidth: 1,
        color: '#27CCC0',
        fontSize: 15,
        marginVertical: 10
    }
};
