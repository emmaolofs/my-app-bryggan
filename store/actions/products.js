import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS'; 


// Products action connects the products to the database in firebase and store them there
// fuctions as update, delete and add orders are conected to the database in this file to keep the database updated

export const fetchProducts = () => {
    return async dispatch => {
      
        try {
            const respons = await fetch('https://my-app-bryggan.firebaseio.com/products.json', {
            method: 'GET'
        });

        if (!respons.ok){
            throw new Error('Något blev fel!');
        }

        const resData = await respons.json();
        const loadedProducts = [];

            for(const key in resData){
                loadedProducts.push(
                    new Product(
                        key, 
                        resData[key].categoryId, 
                        resData[key].title, 
                        resData[key].imageUrl, 
                        resData[key].description, 
                        resData[key].price
                        )
                    );
                }
                
        dispatch({
            type: SET_PRODUCTS, 
            products: loadedProducts, 
            
        });
        } catch(err){
            throw err;
        }
    };
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
 
        const response= await fetch(`https://my-app-bryggan.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        }
        );
        if(!response.ok) {
            throw new Error('Något blev fel!');
        }
        dispatch({ type: DELETE_PRODUCT, pid: productId});
    };
};

export const createProduct = (title, description, imageUrl, price, categoryId) => {
    return async (dispatch) => {
       
        const respons = await fetch('https://my-app-bryggan.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description,
                imageUrl, 
                price,
                categoryId
            })
        });

        const resData = await respons.json();
        dispatch({
            type: CREATE_PRODUCT, 
            productData: {
            id: resData.name, 
            title: title, 
            description: description,
            imageUrl: imageUrl,
            price: price,
            categoryId: categoryId 
        }
    });
};
};

export const updateProduct = (id, title, description, imageUrl, price, categoryId) => {
    return async dispatch => {

        const response= await fetch(`https://my-app-bryggan.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description,
                imageUrl, 
                price,
                categoryId
            })
        });

        if(!response.ok) {
            throw new Error('Något blev fel!');
        }

        dispatch({
            type: UPDATE_PRODUCT, 
            pid: id,
            productData: {
                title: title, 
                description: description,
                imageUrl: imageUrl,
                price: price,
                categoryId: categoryId
            }
        });
    };
};