import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, View, Text, ActivityIndicator, StyleSheet, Alert, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImageHeader from '../../components/UI/ImageHeader';
import Colors from '../../constants/Colors';
import OrderHandlerItem from '../../components/shop/OrderHandlerItem';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as ordersActions from '../../store/actions/orders';


const OrderHandlersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();


  const orders = useSelector(state => state.orders.isNotReadyOrders);
  const dispatch = useDispatch();

const loadOrders = useCallback(async () => {
  setError(null);
  setIsRefreshing(true);

  try {
    await dispatch(ordersActions.fetchOrders());
  } catch (err) {
    setError(err.message);
  }
  setIsRefreshing(false);
}, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrders]);

  if (error) {
    console.log(error);
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

  if(isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>
    );
  }

  if (orders.length === 0) {
    return (<View style={styles.centered}>
      <Text>Inga beställningar hittades</Text>
      <Button
          title="Försök igen"
          onPress={loadOrders}
          color={Colors.primary}
        />
    </View>
    );
  }

  const updateOrderHandler = async (id, setBoolean) => {
    try {
          await dispatch(ordersActions.updateOrder(
          id,
          setBoolean
        )
      )
    }
    catch(err) {
      setError(err.message);
    }
  };

  const removeOrderHandler = async (id) => {
    try {
      await dispatch(ordersActions.deleteOrder(id))
    }
    catch(err) {
      setError(err.message);
    }
  };

  const deleteOrderAlertHandler = (id) => {
    return(
      Alert.alert('Är du säker på att du vill ta bort beställning?', '',
        [
          {text: 'Nej',
          style: 'destructive',
          onPress: () => {}
      },
      {
        text: 'Ja',
        onPress: () => {removeOrderHandler(id)},
      }
      ], 
        {cancelable: false}
      )
    );
  };

  const orderIsReadyAlertHandler = (id) => {
    setIsReady(true);
    const setBoolean = true;
    
    if (isReady) {
      Alert.alert('Är beställningen klar?', '',
        [
          {text: 'Nej',
          style: 'destructive',
          onPress: () => {}
      },
      {
        text: 'Ja',
        onPress: () => {updateOrderHandler(id, setBoolean)},
      }
      ], 
        {cancelable: false}
      );
    }
  };

    return(
        <View style={styles.screen}>
          <ImageHeader/>
            <FlatList
                refreshing={isRefreshing}
                onRefresh={loadOrders}
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData => 
            <OrderHandlerItem 
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
                onSelect={() => orderIsReadyAlertHandler(itemData.item.id)} 
                onRemove={() => deleteOrderAlertHandler(itemData.item.id)}
            />}
            />
        </View>
    );
};

OrderHandlersScreen.navigationOptions = navData => {
  return {
    headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName='ios-menu' onPress={() => {
      navData.navigation.toggleDrawer();
    }} />
    </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accent
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
});

export default OrderHandlersScreen;