import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ImageHeader from '../../components/UI/ImageHeader';
import Colors from '../../constants/Colors';

//Screen for the drink menu. The menu is designed in another program and uploaded as a png in images and called on here.


const DrinkMenuScreen = props => {
return(
  <View style={styles.screen}>
  <ImageHeader/>
    <ScrollView // makes menu scrollable 
  contentContainerStyle={{alignItems: 'center'}} backgroundColor= {Colors.purp}>
     <Image source ={require ('../menuScreens/images/DryckMeny1.png')} style={styles.image}
     resizeMode='cover'
      />
        <Image source ={require ('../menuScreens/images/DryckMeny2.png')} style={styles.image}
      resizeMode='cover'
      />
</ScrollView>
</View>
);}
 

DrinkMenuScreen.navigationOptions = (navData) =>{
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
      backgroundColor: Colors.purp
    },
    image: {
        marginTop: -1,
        width: '100%',
        height: 550,
    },

});

export default DrinkMenuScreen;