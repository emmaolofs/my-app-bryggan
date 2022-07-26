import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const ImageHeader = props => { 
  return(
    <View style={styles.imageContainer}>
      <Image
        source={require ('../UI/images/header2.png')} style={styles.image}
        resizeMode='cover'
      />
    </View>
  )};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  imageContainer: {
    width: '100%',
    height: 150
  }
});

export default ImageHeader;