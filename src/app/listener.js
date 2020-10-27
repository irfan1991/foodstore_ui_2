import store from './store'

// variabek utuk nyipen state auth
let currentAuth;

function listener() {
    
    // membuat variabel prevusAuth akan diberikan currentAuth sbg nilainya 
    let previousAuth = currentAuth;

    // update nilai currentAUth dari nilai state terbaru
    currentAuth = store.getState().auth;

    // cek apakah nilai state auth berubah dari nilai sebelumnya
    if (currentAuth !== previousAuth) {
        
        // jika ada perubahan maka simpan ke local storage
        localStorage.setItem('auth', JSON.stringify(currentAuth));
    }
}

function listen() {
    
    //jika mendengarjan perubahan
    store.subscribe(listener)
}


export {listen}