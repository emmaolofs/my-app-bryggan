import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import { CATEGORY } from '../../data/category-data';
import CategoryItem from '../../components/shop/CategoryItem';
import ImageHeader from '../../components/UI/ImageHeader';
import Colors from '../../constants/Colors';

const CategoriesScreen = props => {
    
    const selectCategoryHandler = (id, title) => {
        props.navigation.navigate('ProductsOverview', {
          categoryId: id,
          categoryTitle: title
        });
      };

    const renderGridItem = itemData => {
      return (
        <CategoryItem
          image={itemData.item.image}
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {selectCategoryHandler(itemData.item.id, itemData.item.title)}}
        />
      );
    };
  
    return (
      <View style={styles.screen}>
          <ImageHeader/>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={CATEGORY}
        renderItem={renderGridItem}
        numColumns={2}
      />
      </View>
    );
  };
  

CategoriesScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'Meny',
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
    headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName='ios-menu' onPress={() => {
        navData.navigation.toggleDrawer();
      }} />
    </HeaderButtons>
    )};
  };
  

const styles = StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: Colors.accent
      }
});

export default CategoriesScreen;