export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXkm8zoKAQ0iI_8qBlG5uqe5aOLMfWkUU',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password, 
                    returnSecureToken: true
                })
            }
        );

        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Ett fel uppstod med registreringen!';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'E-post adressen finns redan.';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    };
}; 

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXkm8zoKAQ0iI_8qBlG5uqe5aOLMfWkUU',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password, 
                    returnSecureToken: true
                })
            }
        );

        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Ett fel uppstod med inloggningen!';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'E-post adressen kunde inte hittas.';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Lösenordet är inte giltigt.';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    };
}; 

export const logout = () => {
    return {type: LOGOUT};
};

