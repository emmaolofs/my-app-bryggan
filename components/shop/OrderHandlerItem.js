import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

import CartItem from './CartItem';
import Card from '../UI/Card';

const OrderHandlerItem = props => {

    return (
    <Card style={styles.orderItem}>  
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>{props.amount} kr</Text>
            <Text style={styles.newOrder}>Ny order!</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button 
                color={'lightgreen'} 
                title={'Färdig'}
                onPress={props.onSelect}
            />
            <Button 
                color={'red'} 
                title={'Ta bort'}
                onPress={props.onRemove}
            />
        </View>
        <View style={styles.detailItems}>
            {props.items.map(cartItem => 
            <CartItem 
            key={cartItem.productId}
            quantity={cartItem.quantity}
            amount={cartItem.sum}
            title={cartItem.productTitle}
            />)}
        </View>
    </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10, 
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', 
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    newOrder: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'red'
    }
});


export default OrderHandlerItem;