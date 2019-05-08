import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Icon} from 'native-base';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import getDirections from 'react-native-google-maps-directions';
import axios from 'axios';
import apiKey from '../common/constants';
import PropTypes from 'prop-types';
import Geocoder from 'react-native-geocoding'

export default class MappingScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      coordinates: [],
      startLoc: props.startLoc, //? props.startLoc : '3770 Southpointe Pkwy Oxford OH 45056',
      destLoc: props.destLoc, //? props.destLoc : '550 E. Spring St. Oxford OH 45056',
      isMapReady: false,
      startCoord: null,
      destCoord: null
    }
    this.getDirections = this.getDirections.bind(this);
    this.handleGetDirections = this.handleGetDirections.bind(this);
    this.onMapLayout = this.onMapLayout.bind(this);
    Geocoder.init(apiKey);

  }
  componentDidMount() {
    Geocoder.from(this.state.startLoc).then(json => {
      const location = json.results[0].geometry.location;
      this.setState({
        startCoord: {
          latitude: location.lat,
          longitude: location.lng
      }})
    })
    Geocoder.from(this.state.destLoc).then(json => {
      const location = json.results[0].geometry.location;
      this.setState({destCoord: {
        latitude: location.lat,
        longitude: location.lng
    }});
    })
    this.getDirections(this.state.startLoc, this.state.destLoc);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startLoc != this.props.startLoc || prevProps.destLoc != this.props.destLoc){ 
      Geocoder.from(this.props.startLoc).then(json => {
        const location = json.results[0].geometry.location;
        this.setState({
          startCoord: {
            latitude: location.lat,
            longitude: location.lng
        }})
        alert(JSON.stringify(location))
      })
      Geocoder.from(this.props.destLoc).then(json => {
        const location = json.results[0].geometry.location;
        this.setState({destCoord: {
          latitude: location.lat,
          longitude: location.lng
      }});
      })
      this.getDirections(this.state.startLoc, this.state.destLoc);
    }
    
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
      source: this.state.startCoord, 
      destination: this.state.destCoord,
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
    const {isMapReady, startCoord, destCoord} = this.state;
    if (startCoord && destCoord){
      return (
        <View style = {{flex: 1, height: 600, width: 400}}>
          <MapView style = {{flex: 1, height: 600, width: 400}}
          region={{
            latitude: startCoord.latitude,
            longitude: startCoord.longitude,
            latitudeDelta:.4,
            longitudeDelta: .5
          }}
          onLayout={this.onMapLayout}>
            {isMapReady && <MapView.Marker
            key = {`${Date.now()}`}
            coordinate = {destCoord}/>}
            {isMapReady && this.state.coordinates.map((coords, index) => {
              return <MapView.Polyline
                key={`${index}${Date.now()}`}
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
    } else {
      return null
    }
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