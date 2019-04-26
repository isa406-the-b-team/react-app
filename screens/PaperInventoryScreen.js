import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { MonoText } from "../components/StyledText";

class PaperInventoryScreen extends React.Component {

  render() {

    /*
    Literally just a clone of BeginRouteScreen
    for re-purposing.
     */
    const addressList = [
      {
        addressLineOne: 'ADDRESS ONE',
        addressLineTwo: 'SECONDLINE ONE'
      },
      {
        addressLineOne: 'ADDRESS TWO',
        addressLineTwo: 'SECONDLINE TWO'
      }];

    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}></View>

            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>ROUTENAMEHERE</Text>

              <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText style={styles.codeHighlightText}>Confirm Addresses</MonoText>
              </View>
            </View>

            <View>
              {
                addressList.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.addressLineOne}
                        subtitle={item.addressLineTwo}
                    />
                ))
              }
            </View>

            <View>
              <Button title="Confirm Route"/>
            </View>

          </ScrollView>
        </View>
    );
  }
}



const styles = StyleSheet.create({
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
