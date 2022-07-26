import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState();
  const dispatch = useDispatch(); 

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
      if (error) {
          Alert.alert('Ett fel uppstod!', error, [{text: 'Okej'}]);
      }
  }, [
      error
  ]);

  const authHandler = async () => {
      let action; 
      if(isSignup){
          action = 
            authActions.signup(
              formState.inputValues.email,
              formState.inputValues.password
        );
      } else {
        action = authActions.login(
            formState.inputValues.email, 
            formState.inputValues.password);
      }
      setError(null);
      setIsLoading(true);
      try{
        await dispatch(action);

        if(formState.inputValues.email === 'klubbmasteriet@sesamit.se') {
          props.navigation.navigate('Admin');
        }
        else if(formState.inputValues.email === 'brygganpersonal@sesamit.se'){
          props.navigation.navigate('OrderHandler');
        }
        else {
          props.navigation.navigate('LoggedIn');
        }
        
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#6ea5db', '#e8ecf5']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-post"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Vänligen skriv in en giltig e-post adress."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Lösenord"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Vänligen skriv in ett giltigt lösenord"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (<ActivityIndicator size='small' color={Colors.primary}/>
              ) : (
              <Button
                title={isSignup ? 'Registrera dig' : "Logga in"}
                color={Colors.primary}
                onPress={authHandler}
              />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Byt till ${isSignup ? 'Logga in' : 'Registrera dig'}`}
                color={Colors.accent}
                onPress={() => {
                    setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = (navData) => {
  return {
  headerTitle: 'Authenticate',
  headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu" iconName='ios-menu' onPress={() => {
      navData.navigation.toggleDrawer();
    }} />
  </HeaderButtons>
  )};
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
