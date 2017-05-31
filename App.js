import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      longitude: 'unknown',
      latitude: 'unknown',
    };
  }

  handlePress() {
    console.warn('PRESSED');
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
      console.warn(this.state.longitude, this.state.latitude);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.handlePress.bind(this)} style={styles.loginButton}>
          <Text style={styles.buttonText}>Find Your Neighborhood</Text>
        </TouchableHighlight>
          <View>
           <Text>
             <Text style={styles.title}>Current position: </Text>
             {this.state.lastPosition}
           </Text>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    width: 300,
    height: 70
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
