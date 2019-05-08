import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

import { MonoText } from '../components/StyledText';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class SelectRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [{name: 'Route A'}, {name: 'Route B'}, {name: 'Route C'}]
    }
    this.getRoutes = this.getRoutes.bind(this);
    this.selectRoute = this.selectRoute.bind(this);
  }

  async getRoutes() {
    try {
      const resp = await axios.get('http://10.36.0.92:8080/route');
      const routes = resp.data ? resp.data : null;
      if (routes && routes.length > 0) {
        this.setState({
          routes: routes
        })
      }
    } catch (e) {
      alert(e)
    }
  }

  componentDidMount() {
    this.getRoutes()
  }
  //TODO Implement function to load and display stored routes on buttons
  //Will we limit the number of routes that can be stored? Or will we need
  //to handle a variable amount of buttons?
  selectRoute(e) {
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}></View>

            <View style={styles.getStartedContainer}>

              <Text style={styles.getStartedText}>Setup a Route</Text>

              <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText style={styles.codeHighlightText}>Choose Route</MonoText>
              </View>

          </View>
          <View>
            {this.state.routes.map((route) => (
            <View
                key = {route.id} 
                style={styles.routeButton}>
              <Button
                  id = {route.id}
                  title= {route.name}
                  type="outline"
                  onPress={() => 
                    this.props.history.push(`/beginRoute/${encodeURIComponent(route.name)}`)}/>
            </View>))}
            
          </View>
          <View>
              <Button
                  title= 'Add a New Route'
                  type="outline"
                  onPress={() => this.props.history.push('/addroute')}/>
          </View>

        </ScrollView>
        
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>By starting a route, you agree to our Terms of Service</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  routeButton: {
    marginVertical: 5,
    marginHorizontal: 35
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 40,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 84,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
