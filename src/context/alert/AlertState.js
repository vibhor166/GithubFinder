import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';


const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set ALert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg: msg, type: type }
    });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 2000);
  };

  return (
    <AlertContext.Provider
      //this provider takes in one prop of value, and we pass in anything which we want to be available to the entire app
      //the props.children will contain all the methods created inside this js file which will then be available to the entire app, when we wrap the provider around all the components in app.js which require access to methods

      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
