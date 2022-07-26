import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const respons = await fetch(`https://my-app-bryggan.firebaseio.com/orders.json`, {
      method: 'GET'
  });

  if (!respons.ok){
      throw new Error('Something went wrong!');
  }

  const resData = await respons.json();
  const loadedOrders = [];

      for(const key in resData){
        loadedOrders.push(
              new Order(
                key,
                resData[key].cartItems,
                resData[key].totalAmount,
                new Date(resData[key].date),
                resData[key].userId,
                resData[key].isReady
              )
        );
      }
    dispatch({
      type: SET_ORDERS, 
      orders: loadedOrders,
      userOrders: loadedOrders.filter(ord => ord.userId === userId),
      isReadyOrders: loadedOrders.filter(ord => ord.isReady === true),
      isNotReadyOrders: loadedOrders.filter(ord => ord.isReady === false)
    });
  } catch (err) {
    throw err;
  }
};
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date= new Date();
    const isReady = false;
    
    const userId = getState().auth.userId;

    if(userId === null || userId === ''){
      throw new Error('Användaren är ej inloggad!')
    }

    const respons = await fetch(`https://my-app-bryggan.firebaseio.com/orders.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString(),
                userId,
                isReady
            }
          )
        }
      );
    if (!respons.ok) {
      throw new Error('Something went wrong!');
    }
    const resData = await respons.json();
    dispatch({
      type: ADD_ORDER,
      orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date, userId: userId, isReady: isReady}
    });
  };
};

export const updateOrder = (id, isReady) => {
  return async dispatch => {
      const response= await fetch(`https://my-app-bryggan.firebaseio.com/orders/${id}.json`, {
        method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              isReady
            })
        });

        if(!response.ok) {
            throw new Error('Something went wrong!');
        }

      dispatch({
          type: UPDATE_ORDER, 
          oid: id,
          orderData: {
              isReady: isReady
          }
      });
  };
};

export const deleteOrder = (id) => {
  return async dispatch => {

  const response= await fetch(`https://my-app-bryggan.firebaseio.com/orders/${id}.json`, {
    method: 'DELETE'
}
);

  if(!response.ok) {
    throw new Error('Something went wrong!');
}
dispatch({ type: DELETE_ORDER, oid: id});
  }
}
