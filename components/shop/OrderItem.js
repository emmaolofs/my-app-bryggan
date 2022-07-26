import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableNativeFeedback, TouchableOpacity} from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
    <Card style={styles.orderItem}>  
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>{props.amount} kr</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button 
        color={Colors.primary} 
        title={showDetails ? "Dölj Detaljer" : "Visa Detaljer"}
        onPress={() => {
            setShowDetails(prevState => !prevState)
        }}
        />
        <Button 
        color={Colors.primary} 
        title={'Se status'}
        onPress={props.onSelect}/>
        {showDetails && (
        <View style={styles.detailItems}>
            {props.items.map(cartItem => 
            <CartItem 
            key={cartItem.productId}
            quantity={cartItem.quantity}
            amount={cartItem.sum}
            title={cartItem.productTitle}
            />)}
            </View>)}
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
    }
});


export default OrderItem;