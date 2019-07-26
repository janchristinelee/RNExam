import React, { Component } from 'react';
import { View, Text, FlatList, Image, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Params } from './GlobalParameters';

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            trendingMoviesData: [],
            movieQuery: '',
            searchedMoviesData: [],
            show: false
        }
    }
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=b8f6659663a445615ffcfc2c4c637c4a')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results)
                this.setState({ trendingMoviesData: responseJson.results })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    searchMovie = () => {
        Keyboard.dismiss()
        fetch('https://api.themoviedb.org/3/search/movie?api_key=b8f6659663a445615ffcfc2c4c637c4a&query=' + this.state.movieQuery)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results)
                if (responseJson.errors === undefined) {
                    this.setState({ searchedMoviesData: responseJson.results, show: true })
                }
                else {
                    this.setState({ show: false })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={{ backgroundColor: '#2B303E' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        style={{ width: 270, height: 36, color: 'white', fontSize: 15, backgroundColor: '#20232d', paddingLeft: 5, marginTop: 10 }}
                        onChangeText={(text) => this.setState({ movieQuery: text })}
                        value={this.state.movieQuery}
                        placeholder={'Search for a movie'}
                        placeholderTextColor={'#c6c6c6'}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#FF2C66', height: 35, width: 75, marginTop: 10 }} onPress={() => { this.searchMovie() }}>
                        <Text keyboard style={{ marginTop: 8, fontSize: 15, color: 'white', textAlign: 'center' }}>Search</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.show ? (
                        <View>
                            <View style={{ flexDirection: 'row', marginVertical: 20, alignSelf: 'center' }}>
                                <Image style={{ tintColor: '#FF2C66', height: 20, width: 20, marginTop: 4 }} source={require('../images/magnifier-tool.png')} />
                                <Text style={{ fontSize: 25, color: 'white' }}> Found Movies</Text>
                            </View>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.searchedMoviesData}
                                scrollEnabled={false}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                            this.props.navigation.navigate('MovieDetails', { movieId: item.id, movieDetails: item })
                                        }}>
                                            <Image source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }} style={{ width: 175, height: 230, resizeMode: 'contain', borderColor: '#20232d', borderWidth: 10 }} defaultSource={require('../images/NotFound.png')} />
                                            <Text style={{ color: 'white', marginTop: 3, fontSize: 15, marginBottom: 30, fontWeight: 'bold' }}>{item.original_title}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    ) : null
                }
                <View style={{ flexDirection: 'row', marginVertical: 20, alignSelf: 'center' }}>
                    <Image style={{ tintColor: '#FF2C66', height: 20, width: 20, marginTop: 4 }} source={require('../images/Star.png')} />
                    <Text style={{ fontSize: 25, color: 'white' }}> Trending Movies</Text>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.trendingMoviesData}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                this.props.navigation.navigate('MovieDetails', { movieId: item.id, movieDetails: item })
                            }}>
                                <Image source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }} style={{ width: 175, height: 230, resizeMode: 'contain', borderColor: '#20232d', borderWidth: 10 }} defaultSource={require('../images/NotFound.png')} />
                                <Text style={{ color: 'white', marginTop: 3, fontSize: 15, marginBottom: 30, fontWeight: 'bold' }}>{item.original_title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView >
        )
    }
}