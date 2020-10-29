const rules = {
  
    email : {
        required  :{value : true, message : 'Email harus diisi'},
        maxLength  :{value : 255, message : 'Panjang Email maksimal 250 karakter'},
        pattern : {value:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, message : 'Email tidak valid'}
    },
    password : {
        required  :{value : true, message : 'Password harus diisi'},
        maxLength  :{value : 255, message : 'Panjang Password maksimal 255 karakter'},
    },
    
}

export { rules }
