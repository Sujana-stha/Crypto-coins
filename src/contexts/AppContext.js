import React, { createContext, useEffect, useReducer } from 'react';

import getCryptoData from '../services/CryptoApi';

export const DEFAULT_API_URL = "https://api.coingecko.com/api/v3/";

//The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    
    switch (action.type) {
        
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                cryptoData: action.payload
            }
        case 'FETCH_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
};

// Sets the initial state when the app loads
const initialState = {
    loading: true,
    error: null,
    cryptoData: []
};


export const AppContext = createContext();

//Provider component - wraps the components we want to give access to the state

export const AppProvider = (props) => {
    
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(() => {
        getCryptoData(1)
        .then(response => {
            dispatch({ type: 'FETCH_SUCCESS', payload: response });
        })
        .catch(error => {
            dispatch({ type: 'FETCH_FAILURE', payload: error });
        });

    },[]);


    return (
        <AppContext.Provider
            value={{...state, dispatch}}
        >
            {props.children}
        </AppContext.Provider>
    );
};
