import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

export class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>{this.props.currentNeighborhood}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
