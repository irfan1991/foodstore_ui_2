//import redux
import { combineReducers, createStore, applyMiddleware, compose } from "redux";

// import redux-thunk
import thunk from 'redux-thunk'

import authReducer from '../features/Auth/reducer';
import productReducer from '../features/Products/reducer'
import cartReducer from '../features/Cart/reducer'

//membuat composer enhencer untuk menghubungkan ke devtolls 
const composerEnhancer = window._REDUX_DEVTOOLS_EXTENTION_COMPOSE || compose;

// gabung reducer 
const rootReducers = combineReducers({
    auth : authReducer,
    cart : cartReducer,
    products : productReducer
});

// buat store 
const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store;