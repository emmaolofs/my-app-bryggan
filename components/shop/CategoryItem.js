import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback, Image} from 'react-native';

const CategoryItem = props => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }
    return(
        <View style={styles.gridItem}>
        <TouchableCmp 
        style={{flex: 1}}
        onPress={props.onSelect}
        >
        <View style={{...styles.container, ...{backgroundColor: 'white'}}}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
        </View>
        </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10, 
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5, 
    }, 
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'right'
    },
    imageContainer: {
        width: '50%',
        height: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
      },
      image: {
        width: '100%',
        height: '100%'
      },
});

export default CategoryItem;
