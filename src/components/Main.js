import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import { Locator } from './Locator';
import { Neighborhood } from './Neighborhood';



export class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      longitude: 'unknown',
      latitude: 'unknown',
      currentNeighborhood: ''
    };
  }

  handlePress() {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=AIzaSyCB8uBv6Wn76vcukvY_S2vOzvdGuw92JvM`, { method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => this.setState({currentNeighborhood: data.results[0].address_components[2].long_name}))
      .catch(err => console.error(err));
  }

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Locator handlePress={this.handlePress.bind(this)} currentNeighborhood={this.state.currentNeighborhood}/>
        <Neighborhood currentNeighborhood={this.state.currentNeighborhood}/>
      </View>
    );
  }
}