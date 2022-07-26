import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View, Image, ScrollView, Text } from "react-native";
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ImageHeader from '../../components/UI/ImageHeader';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';


  
const supportedURL = 'https://docs.google.com/spreadsheets/d/1FzAx-D34vmQjKAFfY0SUH0WSWZXVfii5tLIHhZ7k-HQ/edit?usp=sharing';


const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
    Alert.alert(`Don´t know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button style={styles.buttons} title={children} onPress={handlePress} />;
};

const SchemaScreen = () => {
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}} backgroundColor= {Colors.accent}>
      <ImageHeader/>
      <View style={styles.imageContainer}>
          <Image source ={require ('../menuScreens/images/calendar.png')} style={styles.image} resizeMode= 'cover'/>
      </View>
          <OpenURLButton url={supportedURL} style={styles.button} color={Colors.primary}>Öppna Schema</OpenURLButton>
      <Card style={styles.card}>
        <Text style={styles.title}>Jobba på Bryggan!</Text>
        <Text>Skriv upp dig på schemat för att boka in dig på ett arbetspass på Bryggan, förutom en fantastiskt rolig kväll får du som jobbar även ta del av våra förmåner och självklart bjuder vi på maten när du jobbar!</Text>
      </Card>
    </ScrollView>
  );
};

SchemaScreen.navigationOptions = (navData) =>{
  return {
  headerTitle: 'Schema',
  headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName='ios-menu' onPress={() => {
      navData.navigation.toggleDrawer();
    }} />
  
  </HeaderButtons>
  )};
};


const styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 100,
      backgroundColor: 'white',
      padding: 15,
      margin: 20,
      width: '40%',
      height: 150
    },
    image: {
      width: '70%',
      height: '70%',
    },
    card: {
      padding: 15,
      margin: 20,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 15,
      fontFamily: 'open-sans-bold',
      marginBottom: 5
    },
    text: {
      fontFamily: 'open-sans',
      fontSize: 12,
      marginBottom: 5
    },
});
export default SchemaScreen;