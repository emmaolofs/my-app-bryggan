import { ADD_ORDER, SET_ORDERS, UPDATE_ORDER, DELETE_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: [],
  userOrders: [],
  isReadyOrders: [],
  isNotReadyOrders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
        return {
        orders: action.orders,
        userOrders: action.userOrders,
        isReadyOrders: action.isReadyOrders,
        isNotReadyOrders: action.isNotReadyOrders
      };
      
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date,
        action.orderData.userId,
        action.orderData.isReady
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        userOrders: state.userOrders.concat(newOrder),
        isReadyOrders: state.orders.concat(newOrder),
        isNotReadyOrders: state.orders.concat(newOrder)
      };

    case UPDATE_ORDER: 
    const orderIndex = state.orders.findIndex(ord => ord.id === action.oid);
    const updatedOrder = new Order(
      action.oid, 
      state.orders[orderIndex].items,
      state.orders[orderIndex].amount,
      state.orders[orderIndex].date,
      state.orders[orderIndex].userId,
      action.orderData.isReady
      );

        const updatedIsReadyOrders = [...state.isReadyOrders];
        updatedIsReadyOrders[orderIndex] = updatedOrder;

        const updatedIsNotReadyOrders = [...state.isNotReadyOrders];
        updatedIsNotReadyOrders[orderIndex] = updatedOrder;

        const updatedUserOrders = [...state.userOrders];
        updatedUserOrders[orderIndex] = updatedOrder;

        const updatedOrders = [...state.orders];
        updatedOrders[orderIndex] = updatedOrder;

        return {
          ...state, 
          orders: updatedOrders,
          userOrders: updatedUserOrders,
          isNotReadyOrders: updatedIsNotReadyOrders,
          isReadyOrders: updatedIsReadyOrders,
        };
    case DELETE_ORDER: 
      return {
      ...state,
        orders: state.orders.filter(
        order => order.id !== action.oid
        ),
        userOrders: state.userOrders.filter(
          order => order.id !== action.oid
          ),
        isReadyOrders: state.isReadyOrders.filter(
        order => order.id !== action.oid
        ),
        isNotReadyOrders: state.isNotReadyOrders.filter(
        order => order.id !== action.oid
        ), 
    };
  }

  return state;
};
