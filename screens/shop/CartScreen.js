import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';
import ImageHeader from '../../components/UI/ImageHeader';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setError(null);
    try{
      setIsLoading(true);
      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));

      setIsLoading(false);
    }
    catch(err)
    {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (error) {
      console.log(error);
        Alert.alert('Ett fel uppstod!', error, [
          {text: 'Avbryt',
          style: 'destructive',
        },
          
        {
          text: 'Logga in',
          onPress: () => {props.navigation.navigate('Auth')}
        }
      ]);
      setIsLoading(false);
    }
}, [
    error
]);

const sendOrderAlertHandler = () => {
  return(
    Alert.alert('Vill du skicka din beställning?', '',
      [
        {text: 'Nej',
        style: 'destructive',
        onPress: () => {}
    },
    {
      text: 'Ja',
      onPress: () => {sendOrderHandler()},
    }
    ], 
      {cancelable: false}
    )
  );
};

  return (
    <View style={styles.screen}>
      <ImageHeader/>
      <View style={styles.cardContainer}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Totalt:{' '}
          <Text style={styles.amount}>{Math.round(cartTotalAmount.toFixed(2) * 100) /100} kr</Text>
        </Text>
        {isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> : 
          (<Button
            color={Colors.primary}
            title="Beställ"
            disabled={cartItems.length === 0}
            onPress={sendOrderAlertHandler}
          />)
        }

      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = navData => {
  return { 
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Back"
        iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-round-back'}
        onPress={() => {
          navData.navigation.navigate('Categories');
        }}
      />
    </HeaderButtons>
  )
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cardContainer: {
    margin: 20
  }
});

export default CartScreen;
