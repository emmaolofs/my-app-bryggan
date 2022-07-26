import React from 'react';
import {useDispatch} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform, SafeAreaView, Button, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import Colors from '../constants/Colors';
import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import WelcomeScreen from '../screens/menuScreens/WelcomeScreen';
import CategoriesScreen from '../screens/shop/CategoriesScreen';
import DrinkMenuScreen from '../screens/menuScreens/DrinkMenuScreen';
import SchemaScreen from '../screens/menuScreens/SchemaScreen';
import OrderIsProcessingScreen from '../screens/shop/OrderIsProcessingScreen';
import * as authActions from '../store/actions/auth';

//Navigator for the app when logged in (how to navigate between screens)
//Logged in navigator shows the functions in the app you are authorized to when your logged in on the app.


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

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
    OrderProcessing: OrderIsProcessingScreen,
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

const LoggedInNavigator = createDrawerNavigator(
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
    Orders: {
      screen: OrdersNavigator,
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

export default createAppContainer(LoggedInNavigator);
