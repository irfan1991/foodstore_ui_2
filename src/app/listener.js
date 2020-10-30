import store from './store'
import { saveCart } from "../api/cart";

// variabek utuk nyipen state auth
let currentAuth;

let currentCart; 

// let { token } = store.getState().auth;

function listener() {
    
    // membuat variabel prevusAuth akan diberikan currentAuth sbg nilainya 
    let previousAuth = currentAuth;

    let previousCart = currentCart;

    // update nilai currentAUth dari nilai state terbaru
    currentAuth = store.getState().auth;

    currentCart = store.getState().cart;

    let { token } = currentAuth;

    // cek apakah nilai state auth berubah dari nilai sebelumnya
    if (currentAuth !== previousAuth) {
        
        // jika ada perubahan maka simpan ke local storage
        localStorage.setItem('auth', JSON.stringify(currentAuth));

       // jika auth berubah
        saveCart(token , currentCart);

    }

    if (currentCart !== previousCart) {
        
        localStorage.setItem('cart', JSON.stringify(currentCart));

// cart berubah
    saveCart(token , currentCart);

    }
}

function listen() {
    
    //jika mendengarjan perubahan
    store.subscribe(listener)
}


export {listen}