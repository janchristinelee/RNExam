import React, { Component } from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Params } from './GlobalParameters';
import moment from 'moment';

export default class WatchList extends Component {
    constructor() {
        super()
        this.state = {
            watchlistData: []
        }
    }
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            fetch('https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=b8f6659663a445615ffcfc2c4c637c4a&session_id=' + Params.authorizedToken + '&sort_by=created_at.asc')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson.results)
                    this.setState({ watchlistData: responseJson.results })
                })
                .catch((error) => {
                    console.error(error);
                });
            // get your new data here and then set state it will rerender
        });
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#2B303E' }}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.watchlistData}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('MovieDetails', { movieId: item.id, movieDetails: item })
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }} style={{ width: 167, height: 251, resizeMode: 'contain', borderColor: '#20232d', borderWidth: 11, margin: 25 }} defaultSource={require('../images/NotFound.png')} />
                                    <View style={{ marginTop: 25, width: 175 }}>
                                        <Text style={styles.headerText}>{item.original_title}</Text>
                                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginTop: 15 }}>{moment(item.release_date, "YYYY-MM-DD").format('YYYY')}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 5 }}>{item.vote_average}</Text>
                                            <Image source={require('../images/Star.png')} style={{ width: 15, height: 15, tintColor: '#FF2C66' }} />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
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