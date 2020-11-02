import axios from 'axios'

import { config } from "../config";

export async function getAddress(params) {
    let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    let skip = params.page * params.limit - params.limit ;

    return await axios.get(`${config.api_host}/api/delivery-address`, {
        params : {
            limit : params.limit,
            skip : skip
        },
        headers : {
            authorization : `Bearer ${token}`
        }
    })
}

export async function createAddress(payload) {
    let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.api_host}/api/delivery-address`, payload ,{
        headers : {
            authorization : `Bearer ${token}`
        }
    })
}