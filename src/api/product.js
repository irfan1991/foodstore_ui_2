import axios from 'axios'

import { config } from "../config";

export async function getProducts(data) {
    return await axios.get(`${config.api_host}/api/products`, data);
}

export async function login(email, password) {
    return await axios.post(`${config.api_host}/auth/login`, {email, password});
}

export async function logout() {
    let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.api_host}/auth/logout`,null, {
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then((response) => {
        localStorage.removeItem('auth');
        return response;
    })
}