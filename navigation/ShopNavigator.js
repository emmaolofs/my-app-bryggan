import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Platform, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator} from 'react-navigation-drawer';

import LoggedInNavigator from '../navigation/LoggedInNavigator';
import AdminNavigator from '../navigation/AdminNavigator';
import OrdersNavigator from '../navigation/OrdersNavigator';

import Colors from '../constants/Colors';
import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import WelcomeScreen from '../screens/menuScreens/WelcomeScreen';
import AuthScreen from '../screens/user/AuthScreen';
import CategoriesScreen from '../screens/shop/CategoriesScreen';
import DrinkMenuScreen from '../screens/menuScreens/DrinkMenuScreen';
import SchemaScreen from '../screens/menuScreens/SchemaScreen';

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

const ProductsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
    Auth: AuthScreen
  },
  {
    navigationOptions: {

      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-restaurant' : 'ios-restaurant'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const StartNavigator = createStackNavigator(
  {
    Start: WelcomeScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-star-outline' : 'ios-star-outline'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
},
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-log-in' : 'ios-log-in'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOptions
}
);

const DrinkNavigator = createStackNavigator(
  {
    Dryck: DrinkMenuScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-beer' : 'ios-beer'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);


const SchemaNavigator = createStackNavigator(
  {
    Schema: SchemaScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-grid' : 'ios-grid'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Bryggan: StartNavigator,
    Meny: ProductsNavigator,
    DrinkMenu: {
      screen: DrinkNavigator,
      navigationOptions: {
        drawerLabel: 'Dryckesmeny'
    }
    },
    Schema: SchemaNavigator,
    LogIn: {screen: AuthNavigator,
      navigationOptions: {
        drawerLabel: 'Logga in'
    }
  }
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const MainNavigator = createSwitchNavigator({
  Shop: ShopNavigator,
  LoggedIn: LoggedInNavigator,
  Admin: AdminNavigator,
  OrderHandler: OrdersNavigator
});

export default createAppContainer(MainNavigator);
