import {
    ADD_ITEM,REMOVE_ITEM,SET_ITEMS,CLEAR_ITEMS

 } from "./constants";

const statuslist = {
    idle : 'idle',
    process : 'process',
    success : 'success',
    error : 'error'
} 

let initialState =  localStorage.getItem('cart')  ? JSON.parse(localStorage.getItem('cart')) : [] ;

export default function reducer(state = initialState, action) {
    
    switch (action.type) {
        case ADD_ITEM: 
            if (state.find(item => item._id === action.item._id)) {
                
                return state.map(item => ({...item, qty : item._id === action.item._id ? item.qty + 1 : item.qty }))
            } else {
                return [...state, {...action.item, qty : 1} ];
            }      
          

        case REMOVE_ITEM:       
            return state.map(item => ({...item, qty : item._id === action.item_id ? item.qty - 1: item.qty}))
            .filter(item => item.qty > 0)

        case CLEAR_ITEMS:       
            return [];

        case SET_ITEMS:       
            return action.items;
            
    
        default:
            return state;
    }
}