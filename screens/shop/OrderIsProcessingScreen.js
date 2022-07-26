import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import ImageHeader from '../../components/UI/ImageHeader';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

import * as ordersActions from '../../store/actions/orders';

const OrderIsProcessingScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [isReady, setIsReady] = useState(false);
    //const [time, setTime] = useState(Date.now());
    let timer; 

    const dispatch = useDispatch();

    const orderId = props.navigation.getParam('orderId');
    const orderItem = props.navigation.getParam('orderItem');

    const readyOrders = useSelector(state => state.orders.userOrders.filter(ord => ord.isReady === true));
    const findReadyOrderID = readyOrders.map(ord => ord.id);

    //This function checks if the id of the order that is clicked contains in the array that holds the id of all the users orders where 
    //boolean isReady equals to true 
    function eleContainsInArray(findReadyOrderID, orderId){
        if(findReadyOrderID != null && findReadyOrderID.length >0){
            for(var i=0; i<findReadyOrderID.length; i++){
                if(findReadyOrderID[i] === orderId){
                        return true;
                    }
                }
            }
                return false;
    };

    //checks if the element doesn't exist in the array by calling the funtion above, so if the array doesn't hold the id of the order it means
    //that the order is not ready and it returns. If it does hold the id of the order it means that the order is ready therefore it should stop
    //loading and setIsLoading is set to false and since the order is ready setIsReady is set to true 
    const checkIfelContainsInArray = (findReadyOrderID, orderId) => {
        if(!eleContainsInArray(findReadyOrderID, orderId)){
            return; 
        }
        setIsLoading(false);
        setIsReady(true);
        //clears the timer if the order is ready 
        clearTimer();
    };

    //fetching the orders from the database by calling the action fetchOrders that is hooked up to the database
    const loadOrders = useCallback(async () => {
        const interval = setInterval(() => Date.now(), 100000);
        setError(null);
        try {
          await dispatch(ordersActions.fetchOrders());
          dispatch(setTimer(interval));
        } catch (err) {
          setError(err.message);
        }
      }, [dispatch, setError]);

      useEffect(() => {
        //let _isMounted = true;
        loadOrders().then(() => {
            //if (_isMounted) {
            checkIfelContainsInArray(findReadyOrderID, orderId)
            //}
        });
        //return () => _isMounted = false;
      }, [dispatch, loadOrders, checkIfelContainsInArray]);

    //function that clears the timer
    const clearTimer = () => {
        if(timer){
            clearTimeout(timer);
        }
    };
    
    //function that sets the timer
    const setTimer = time => {
        return(
            timer = setTimeout(() => {
                loadOrders();
            }, time)
        )
    };

    if(isReady){
        return (
            <View style={styles.centered}>
              <Text>Din beställning är klar!</Text>
            </View>
          );
    };

    if(isLoading) {
        checkIfelContainsInArray(findReadyOrderID, orderId)
        return (
            <View style={styles.centered}>
              <ActivityIndicator size='large' color={Colors.primary}/>
              <Text>Din beställning bearbetas!</Text>
            </View>
          );
    }

    if (error) {
        return (
          <View style={styles.centered}>
            <Text>Ett fel uppstod!</Text>
            <Button
              title="Försök igen"
              onPress={loadOrders}
              color={Colors.primary}
            />
          </View>
        );
      }

    return (
        <View Style={styles.screen}>
            <ImageHeader/>
            <View style={styles.container}>
                <View style= {styles.isLoading}>  
                </View>
                <View style={styles.cartContainer}>
                    <View style={styles.detailItems}>
                        {orderItem.map(cartItem => 
                            <CartItem 
                                key={cartItem.productId}
                                quantity={cartItem.quantity}
                                amount={cartItem.sum}
                                title={cartItem.productTitle}
                            />)}
                    </View>
                </View>
            </View>
        </View>
    );  
}

OrderIsProcessingScreen.navigationOptions = navData => {
    return {
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Back"
            iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-round-back'}
            onPress={() => {
              navData.navigation.navigate('Orders');
            }}
          />
        </HeaderButtons>
      )};
  };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accent,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    detailItems: {
        width: '100%',
        height: '100%'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%'
    },
    cartContainer: 
    {
        margin: 20
    },
    isLoading: {
        padding: 20
    }
});

export default OrderIsProcessingScreen;