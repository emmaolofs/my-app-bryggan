import React, { useState, useEffect, useCallback } from 'react';
import {FlatList, Button, Platform, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import ImageHeader from '../../components/UI/ImageHeader';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const catId = props.navigation.getParam('categoryId');

  const selectedCategory = useSelector(state =>
    state.products.availableProducts.filter(prod => prod.categoryId.indexOf(catId) >= 0)
  );

  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };


//Function that fetches the products from the database by calling the action file and then the function within the action file
//this is wrapped in a try-catch to prevent the application from crashes 
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Försök igen"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const renderGridItem = itemData => {
      return (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="Detaljer"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Lägg till"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      );
    };


  return (
    <View style={styles.screen}>
          <ImageHeader/>
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadProducts}
      data={selectedCategory}
      keyExtractor={item => item.id}
      renderItem={renderGridItem}
    />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
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
    )};
};

const styles = StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' },
  screen: {
    flex: 1,
    backgroundColor: Colors.accent
  }
});

export default ProductsOverviewScreen;
