import React , {useState , useEffect} from 'react'
import { useRouteMatch} from 'react-router-dom'
import { getInvoiceByOrderId } from "../../api/invoice";
import { LayoutOne, Text, Table } from "upkit";
import TopBar from '../../components/TopBar';
import BounceLoader from 'react-spinners/BounceLoader';
import {config} from '../../config';
import StatusLabel from '../../components/StatusLabel';
import { formatRupiah } from "../../utils/format-rupiah";

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
    }, []);

    if (error.length) {
        return (
            <LayoutOne>
                <TopBar/>
                <Text as='h3'>Terjadi Kesalahan</Text>
                {error}
            </LayoutOne>
        ) 
    }

    if (status === 'process') {
        return <LayoutOne>
            <div className="text-center py-10">
                <div className="inline-block">
                    <BounceLoader color="blue" />
                </div>
            </div>
        </LayoutOne>
    }

    return (
        <LayoutOne>
            <TopBar />
            <Text as="h3" >Invoice</Text>
            <br />

            <Table
                showPagination={false}
                items={[
                    {label:'Status',value: <StatusLabel status={invoice?.payment_status} />},
                    {label:'Order ID',value: '#' + invoice?.order?.order_number },
                    {label:'Total amount',value: formatRupiah(invoice?.total) },
                    {label:'Billed to',value: <div>
                        <b>{invoice?.user?.full_name}</b><br />
                        <b>{invoice?.user?.email}</b><br />
                        <b>{invoice?.delivery_address?.detail}</b><br />
                        <b>{invoice?.delivery_address?.kelurahan}</b><br />
                        <b>{invoice?.delivery_address?.kecamatan}</b><br />
                        <b>{invoice?.delivery_address?.kabupaten}</b><br />
                        <b>{invoice?.delivery_address?.provinsi}</b><br />
                    </div>},
                    {label:'Payment to',value:<div>
                        {config.owner} <br/>
                        {config.contact} <br/>
                        {config.billing.account_no} <br/>
                        {config.billing.bank_name}
                    </div>}
                ]}
                columns={[
                    {Header : 'Invoice', accessor:'label'},
                    {Header : '', accessor:'value'},
                ]}
            />
        </LayoutOne>
    )
    
}
