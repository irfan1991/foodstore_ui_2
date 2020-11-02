import  React , {useState, useEffect, useCallback} from 'react'
import { getAddress } from "../api/delievery-address";


const statuslist = {
    idle : 'idle',
    process : 'process',
    success : 'success',
    error : 'error'
} 


export function useAddressData() {
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState(statuslist.idle)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10);

    let fecthAddress = useCallback(async function () {
        let {data : {data, count , error}} = await getAddress({page, limit});

        if (error) {
            setStatus(statuslist.error)
            return
        }

        // jika sukses
        setStatus(statuslist.success)
        setData(data)
        setCount(count)
    }, [page, limit]); // sebgai depedensi

    useEffect(() => {
        fecthAddress();
       
    }, [fecthAddress]);

    // mengembalikan local state dan beberapa fungsi 

    return {
        data,
        count,
        status,
        page,
        limit,
        setPage,
        setLimit
    }
}

