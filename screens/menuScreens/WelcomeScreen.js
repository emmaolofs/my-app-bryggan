import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image, ImageBackground} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import Card from '../../components/UI/Card';
import Carousel from 'react-native-looped-carousel';
import ImageHeader from '../../components/UI/ImageHeader';
import Colors from '../../constants/Colors';

import HeaderButton from '../../components/UI/HeaderButton';

//Welcomescreen is the first screen you navigate to in the app.  
// We have a picture as background that we made in to a carousel that can autoplayed our be swiped
// Where you can see three different containers with information about bryggan 

const WelcomeScreen = () => {
  return(
        <View style={styles.screen}>
          <ImageBackground source={require('../menuScreens/images/Welcome.png')} style={styles.image}>
          <Carousel
            style={styles.size}
            autoplay={false}
            pageInfo
            pageInfoTextStyle={styles.textWhite}
          >
            <View style={styles.textContainer}>
              <Text style={styles.titleWhite}>Öppettider</Text>
              <Text style={styles.textWhite}>Onsdagar: 18-00</Text>
              <Text style={styles.textWhite}>Fredagar: 18-00</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleWhite}>Boka bryggan</Text>
              <Text style={styles.textWhite}>klubbmasteriet@sesamit.se</Text>
              <Text style={styles.textWhite}>Tel: 076-948 28 12</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleWhite}>Hitta hit</Text>
              <Text style={styles.textWhite}>Studentgatan 2</Text>
              <Text style={styles.textWhite}>Örebro Universitet</Text>
            </View>
          </Carousel>
          </ImageBackground>
        </View>
  );
}

WelcomeScreen.navigationOptions = (navData) =>{
  return {
  headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu" iconName='ios-menu' onPress={() => {
      navData.navigation.toggleDrawer();
    }} />
  </HeaderButtons>
  )};
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column"
  },
  textContainer: {
    justifyContent: 'center',
    alignItems:'center',
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  titleWhite: {
    fontSize: 15,
    fontFamily: 'open-sans-bold',
    marginBottom: 5,
    color: 'white'
  },
  textWhite: {
    fontFamily: 'open-sans',
    fontSize: 12,
    marginBottom: 5,
    color: 'white'
  },
  size: {
    width: '100%',
    height: '100%',
  },

});

export default WelcomeScreen; 
