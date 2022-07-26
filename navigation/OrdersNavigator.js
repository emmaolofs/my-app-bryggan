import React from 'react';
import {useDispatch} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import * as authActions from '../store/actions/auth';
import OrderHandlersScreen from '../screens/Orders/OrderHandlersScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
    render() {
      return(
        <ImageBackground
        style={StyleSheet.container}
        source={require('../screens/menuScreens/images/bryggan.png')}>
  
        </ImageBackground>)},
  headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
        elevation: 1,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
  };

  const OrderHandlerNavigator = createStackNavigator(
    {
      OrderHandler: OrderHandlersScreen,
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );

  const OrderHandlerDrawerNavigator = createDrawerNavigator(
    {
      OrderHandler: {
        screen: OrderHandlerNavigator,
        navigationOptions: {
          drawerLabel: 'Beställningar'
      }
    }
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      },
      contentComponent: props =>{
        const dispatch = useDispatch();
        return <View style ={{flex: 1, paddingTop: 20}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerItems {...props}/>
    
          <Button title="Logga ut" color={Colors.primary} onPress={()=>{
            dispatch(authActions.logout());
            props.navigation.navigate('Auth'); //LoggOut function, shows in the drawer menu when you are logged in
          }}/>
        </SafeAreaView>
        </View>;
      }
    }
  );

  export default createAppContainer(OrderHandlerDrawerNavigator);