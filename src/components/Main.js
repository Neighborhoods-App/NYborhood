import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Locator } from './Locator';
import { Neighborhood } from './Neighborhood';
import { Play } from './Play';
import { Eat } from './Eat';
import config from '../../config.js'



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
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${config.GEO_KEY}`, { method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then((data) => {
        data.results[0].address_components.forEach((element) =>{
          if(element.types[0] === 'neighborhood'){
            this.setState({currentNeighborhood: element.long_name})
          }
        })
      })
      .then(() => {
        this.tabView.goToPage(1);
      })
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
      <ScrollableTabView
        tabBarBackgroundColor='blue'
        tabBarActiveTextColor='yellow'
        tabBarInactiveTextColor='white'
        tabBarPosition='bottom'
        ref={(tabView) => { this.tabView = tabView; }}
      >
        <Locator tabLabel="Locator" handlePress={this.handlePress.bind(this)} currentNeighborhood={this.state.currentNeighborhood}/>
        <Neighborhood tabLabel="Hood" currentNeighborhood={this.state.currentNeighborhood}/>
        <Play tabLabel="Play" currentNeighborhood={this.state.currentNeighborhood}/>
        <Eat tabLabel="Eat" currentNeighborhood={this.state.currentNeighborhood}/>

      </ScrollableTabView>
    );
  }
}
