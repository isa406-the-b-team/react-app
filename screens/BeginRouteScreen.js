import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { MonoText } from "../components/StyledText";
import axios from 'axios';

export default class BeginRouteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: this.props.match.params.routeId,
      addressList: []
    }
    this.getRoute = this.getRoute.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }
  async getRoute() {
    const route = await axios.get(`http://10.36.0.92:8080/route/${encodeURIComponent(this.state.routeId)}`);
    if (route.data) {
      this.setState({
        addressList: route.data.data.recipients
      });
    }
  }
  componentDidMount() {
    this.getRoute();
  }
  nextPage() {
    this.props.history.push(`/papers/${encodeURIComponent(this.state.routeId)}`)
  }
  render() {

    //TODO Implement confirm route button function
    //TODO Retrieve actual address list
    /*
    This array can be expanded to include as many elements as needed.
    The easiest solution to display addresses is to write a function to
    retrieve them from the selected route and populate the array
    before we render the page.

    Google "react native elements ListItem" for more info.
     */
    

    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}></View>

            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>{this.state.routeId}</Text>

              <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText style={styles.codeHighlightText}>Confirm Addresses</MonoText>
              </View>
            </View>

            <View>
              {
                this.state.addressList.map((item, i) => (
                    <ListItem
                        key={i}
                        title={`${item.street1}`}
                        subtitle={`${item.city}, ${item.state} ${item.zip}`}
                    />
                ))
              }
            </View>

            <View style={styles.confirmButton}>
              <Button title="Confirm Route"
                onPress={this.nextPage}/>
            </View>

          </ScrollView>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  confirmButton: {
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
