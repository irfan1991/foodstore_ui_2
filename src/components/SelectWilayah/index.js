import React , {useState, useEffect} from 'react'
import axios from 'axios'
import { config } from "../../config";
import {oneOf, number, oneOfType, string, shape, func} from 'prop-types'
import { Select } from "upkit";

export default function SelectWilayah({tingkat, kodeInduk , onChange, value}) {

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false)

    // get api wilayah
    useEffect(() => {
        setIsFetching(true);

        axios.get(`${config.api_host}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`)
            .then(({data}) => {

                if(!data.error) {
                    setData(data)    
                } else {
                    console.log(data.error);
                    
                }

            })
            .finally(_=> setIsFetching(false))
       
    }, [kodeInduk, tingkat])
    return <Select 
        options={data.map(wilayah => ({label : wilayah.nama, value : wilayah.kode}))}
        onChange = {onChange}
        value ={value}
        isLoading={isFetching}
        isDisabled = {isFetching || !data.length}
    />
}

SelectWilayah.defaultProps = {
    tingkat : 'provinsi'
}

SelectWilayah.propTypes = {
    tingkat: oneOf(['provinsi','kabupaten','kecamatan','desa']),
    kodeInduk : oneOfType([number, string]),
    onChange : func,
    value :  shape({label : string , value: oneOfType([string, number])})
    
}
