import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, FlatList, Alert, Keyboard } from 'react-native';
import { Params } from './GlobalParameters';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class MovieDetails extends Component {
    constructor() {
        super()
        this.state = {
            reviewsData: [],
            starRating: '',
            showReviews: false,
            showSynopsis: false
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        fetch('https://api.themoviedb.org/3/movie/' + params.movieId + '/reviews?api_key=b8f6659663a445615ffcfc2c4c637c4a')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.results.length !== 0) {
                    this.setState({ reviewsData: responseJson.results, showReviews: true })
                }
                else {
                    this.setState({ showReviews: false })
                }

            })
            .catch((error) => {
                console.error(error);
            });
        if (params.movieDetails.overview !== "") {
            this.setState({ showSynopsis: true })
        }
        else {
            this.setState({ showSynopsis: false })
        }
    }

    rateMovie = () => {
        Keyboard.dismiss()
        const { params } = this.props.navigation.state
        fetch('https://api.themoviedb.org/3/movie/' + params.movieId + '/rating?api_key=b8f6659663a445615ffcfc2c4c637c4a&session_id=' + Params.authorizedToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "value": this.state.starRating
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert('Successfully rated the movie.')
            })
            .catch((error) => {
                console.error(error);
            });
    }

    deleteRating = () => {
        const { params } = this.props.navigation.state
        fetch('https://api.themoviedb.org/3/movie/' + params.movieId + '/rating?api_key=b8f6659663a445615ffcfc2c4c637c4a&session_id=' + Params.authorizedToken, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert('Successfully deleted the rating.')
            })
            .catch((error) => {
                console.error(error);
            });
    }

    addToWatchlist = () => {
        const { params } = this.props.navigation.state
        fetch('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=b8f6659663a445615ffcfc2c4c637c4a&session_id=' + Params.authorizedToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "media_type": "movie",
                "media_id": params.movieId,
                "watchlist": true
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                Alert.alert('Successfully added movie to watchlist.')
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { params } = this.props.navigation.state
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={{ backgroundColor: '#2B303E' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/w500' + params.movieDetails.poster_path }} style={{ width: 167, height: 251, resizeMode: 'contain', borderColor: '#20232d', borderWidth: 11, margin: 25 }} defaultSource={require('../images/NotFound.png')} />
                    <View style={{ marginTop: 25, width: 175 }}>
                        <Text style={styles.headerText}>{params.movieDetails.original_title}</Text>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginTop: 15 }}>{moment(params.movieDetails.release_date, "YYYY-MM-DD").format('YYYY')}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 5 }}>{params.movieDetails.vote_average}</Text>
                            <Image source={require('../images/Star.png')} style={{ width: 15, height: 15, tintColor: '#FF2C66' }} />
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15 }} onPress={() => { this.addToWatchlist() }}>
                            <Image source={require('../images/plus.png')} style={{ width: 15, height: 15, tintColor: 'white', marginRight: 5 }} />
                            <Text style={{ color: 'white' }}>Add to Watchlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25 }}>
                    {
                        this.state.showSynopsis ? (
                            <View>
                                <Text style={[styles.headerText, { marginBottom: 15 }]}>Synopsis</Text>
                                <Text style={{ color: 'white', marginBottom: 25 }}>{params.movieDetails.overview}</Text>
                            </View>
                        ) : null
                    }

                    {
                        this.state.showReviews ? (
                            <View>
                                <Text style={styles.headerText}>Movie Reviews</Text>
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.reviewsData}
                                    scrollEnabled={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{ marginVertical: 15 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={require('../images/man-user.png')} style={{ height: 10, width: 10, tintColor: 'white', margin: 3 }} />
                                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.author}</Text>
                                                </View>
                                                <Text style={{ color: 'white' }} numberOfLines={3}>{item.content}</Text>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        ) : null
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        style={{ width: 270, height: 36, color: 'white', fontSize: 15, backgroundColor: '#20232d', paddingLeft: 5, marginTop: 10 }}
                        onChangeText={(text) => this.setState({ starRating: text })}
                        value={this.state.starRating}
                        placeholder={'Leave a star rating'}
                        placeholderTextColor={'#c6c6c6'}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#FF2C66', height: 35, width: 75, marginTop: 10 }} onPress={() => { this.rateMovie() }}>
                        <Text style={{ marginTop: 8, fontSize: 15, color: 'white', textAlign: 'center' }}>Rate</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { this.deleteRating() }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image source={require('../images/rubbish-bin.png')} style={{ width: 15, height: 15, marginTop: 15, tintColor: 'darkgray' }} />
                        <Text style={{ color: 'darkgray', fontSize: 15, textAlign: 'center', paddingVertical: 15 }}> Delete Rating?</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAwareScrollView >
        )
    }
}

const styles = {
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
}