import React, {useEffect, useState, useCallback, Component} from 'react';
import { FlatList, View, Text, Platform, ActivityIndicator, StyleSheet, Alert, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ImageHeader from '../../components/UI/ImageHeader';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const userOrders = useSelector(state => state.orders.userOrders);
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

  if (userOrders.length === 0) {
    return (<View style={styles.centered}>
      <Text>Ingen beställning hittades</Text>
      <Button
            title="Läs in beställningar"
            onPress={loadOrders}
            color={Colors.primary}
          />
    </View>
    );
  }

  const selectedOrderHandler = (id, items) => {
    props.navigation.navigate('OrderProcessing', {
      orderId: id,
      orderItem: items
    });
  }

  return (
    <View style={styles.screen}>
          <ImageHeader/>
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadOrders}
      data={userOrders}
      keyExtractor={item => item.id}
      renderItem={itemData => 
      <OrderItem 
      amount={itemData.item.totalAmount}
      date={itemData.item.readableDate}
      items={itemData.item.items}
      onSelect= {() => {selectedOrderHandler(itemData.item.id, itemData.item.items)}}
      />}
    />
    </View>
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.accent
  }
});

export default OrdersScreen;
