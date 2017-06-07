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
  componentWillMount() {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.6880397,-73.9216922&rankby=distance&types=museum|park|art_gallery|amusement_park|bowling_alley|library|movie_theater|z00&key=${config.PLACES_KEY}`)
      .then(response => response.json())
      .then(data => data.results)
      .then(results => {
        results.map(item => {
          fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=${config.PLACES_KEY}`)
          .then(response => response.json())
          .then(data => data.result)
          .then(result => {
            let listings = [...this.state.listings, {name: result.name, address: result.formatted_address}]
            this.setState({ listings })
            console.log(this.state.listings);
          })
        })
      })
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
