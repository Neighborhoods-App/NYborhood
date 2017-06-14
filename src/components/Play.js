import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import config from '../../config.js';

export class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    }
  }
  componentDidMount() {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.6880397,-73.9216922&rankby=distance&types=museum|park|art_gallery|amusement_park|bowling_alley|library|movie_theater|z00&key=${config.PLACES_KEY}`)
      .then(response => response.json())
      .then(data => data.results)
      .then(results => {
        return Promise.all(results.map(item => {
          return m sfetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=${config.PLACES_KEY}`)
        }))
      })
      .then(fetchArray => Promise.all(fetchArray.map(response => response.json())))
      .then(jsonArray => jsonArray.map(item => item.result))
      .then(jsonArray => jsonArray.map(result => ({
          name: result.name,
          address: result.formatted_address,
          photo: result.photos ? result.photos[0].photo_reference : null,
          place_id: result.place_id,
          types: result.types
      })))
      .then(listings => this.setState({ listings }))
  }
  componentDidUpdate(){
    console.log(this.state.listings);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.playText}>Play in {this.props.currentNeighborhood}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playText: {
    fontSize: 40,
    fontWeight: 'bold',
  }
});

//WORKING ON NAV==============================
