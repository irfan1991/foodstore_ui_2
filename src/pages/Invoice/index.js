import React , {useState , useEffect} from 'react'
import { useRouteMatch} from 'react-router-dom'
import { getInvoiceByOrderId } from "../../api/invoice";

export default function Invoice() {

    const [invoice, setInvoice] = useState(null)
    const [error, setError] = useState('')
    const [status, setStatus] = useState('process')
    let {params } = useRouteMatch();

    useEffect(() => {
      getInvoiceByOrderId(params?.order_id)
      .then(({data}) => {
          if (data?.error) {
              setError(data.message || "Terjadi kesalahan yang tidak dietahui");
          }

          setInvoice(data);
      })
      .finally(() => setStatus('idle'))
    }, [])
    return (
        <div>
            
        </div>
    )
}
