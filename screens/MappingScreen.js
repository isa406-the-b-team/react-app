import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon} from 'native-base';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import getDirections from 'react-native-google-maps-directions';
import axios from 'axios';
import apiKey from '../common/constants';
import PropTypes from 'prop-types';

export default class MappingScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      coordinates: [],
      startLoc: props.startLoc ? props.startLoc : '3770 Southpointe Pkwy Oxford OH 45056',
      destLoc: props.destLoc ? props.destLoc : '550 E. Spring St. Oxford OH 45056',
      isMapReady: false
    }
    this.getDirections = this.getDirections.bind(this);
    this.handleGetDirections = this.handleGetDirections.bind(this);
    this.onMapLayout = this.onMapLayout.bind(this);

  }
  componentDidMount() {
    this.getDirections(this.state.startLoc, this.state.destLoc);
  }
  
  getDirections(startLoc, destinationLoc) {
    const start = startLoc.replace(' ', '+');
    const dest = destinationLoc.replace(' ', '+');
    const request = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${dest}&mode=driving&key=${apiKey}`;
    axios.get(request).then((response)=> {
      const respJson = response.data;
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index)=> {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      const newCoords = [...this.state.coordinates, coords];
      this.setState({ coordinates: newCoords });
      return coords;
    }).catch((error)=>{
      alert(error);
      return error;
    })
  }
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: 39.491607,
        longitude: -84.718391
      }, destination: {
        latitude: 39.507776,
        longitude: -84.733247 
      },
      params: [
        {key: 'travelmode', value: 'driving'}
      ]
    }
    getDirections(data)
  }

  onMapLayout() {
    this.setState({isMapReady: true});
  }
  render() {
    const {isMapReady} = this.state;
    return (
      <View style = {{flex: 1, height: 600, width: 400}}>
        <MapView style = {{flex: 1, height: 600, width: 400}}
        initialRegion={{
          latitude: 39.491607,
          longitude: -84.718391,
          latitudeDelta: .04,
          longitudeDelta: .05
        }}
        onLayout={this.onMapLayout}>
          {isMapReady && <MapView.Marker
          coordinate = {{
            latitude: 39.507776,
            longitude: -84.733247
          } }/>}
          {isMapReady && this.state.coordinates.map((coords, index) => {
            return <MapView.Polyline
              key={index}
              index={index}
              coordinates={coords}
              strokeWidth={2}
              strokeColor='blue'
            />
         })}
        </MapView>
        <Button transparent>
            <Icon
              size={30}
              color={'#fff'}
              name={'ios-car'}
              onPress={this.handleGetDirections}
            />
          </Button>
      </View>
    );
  }
}

MappingScreen.propTypes = {
  startLoc: PropTypes.string,
  destLoc: PropTypes.string
}

const styles = StyleSheet.create(
  {
    container: {

    },
    map: {

    }
  }
);