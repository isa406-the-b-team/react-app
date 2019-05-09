import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { MonoText } from "../components/StyledText";
import axios from 'axios';

export default class PaperInventoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: this.props.match.params.routeId,
      paperList: [
        {
          code: 'NYT',
          number: 0
        },
        {
          code: 'WSJ',
          number: 0
        }
      ]
    };
    this.getPapers = this.getPapers.bind(this);
  }
  async getPapers() {
    if (this.state.routeId){
      const papers = await axios.get(`http://10.36.0.92:8080/newspaper/${this.state.routeId}`);
      if (papers.data) {
        this.setState({
          paperList: papers.data.data.newspapers
        })
      }
    }
  }
  componentDidMount() {
    this.getPapers();
  }
  render() {

    //TODO Implement confirm papers button function
    //TODO Retrieve actual paper inventory
    /*
    See BeginRouteScreen
     */

    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}></View>

            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>{this.state.routeId}</Text>

              <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText style={styles.codeHighlightText}>Items to be Delivered</MonoText>
              </View>
            </View>

            <View>
              {
                this.state.paperList.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.code}
                        subtitle={`${item.number} copies needed`}
                    />
                ))
              }
            </View>

            <View style={styles.confirmButton}>
              <Button title="Confirm Papers"
                onPress={() => this.props.history.push(`/mapping/${this.state.routeId}`)}/>
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
