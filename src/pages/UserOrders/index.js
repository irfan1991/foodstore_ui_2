import React , {useState, useCallback , useEffect} from 'react';
import { LayoutOne, Text, Table , Button} from "upkit";
import TopBar from '../../components/TopBar';
import StatusLabel from '../../components/StatusLabel';
import { formatRupiah } from "../../utils/format-rupiah";
import { sumPrice } from "../../utils/sum-price";
import { Link } from 'react-router-dom';
import { getOrders } from "../../api/order";
import FaFileInvoiceDollar from '@meronex/icons/fa/FaFileInvoiceDollar'

const columns = [
    {
        Header : '',
        id : 'Status',
        accessor : order => {
            return <div>
                #{order.order_number}<br />
                <StatusLabel status={order.status} />
            </div>
        },

        Header : 'Items',
        accessor : order => {
            return <div>
               {order.order_items.map(item => {
                   return <div key={item._id}>
                       {item.name} {item.qty}
                   </div>
               })}
            </div>
        },

        Header : 'Total',
        accessor : order => {
            return <div>
               {formatRupiah(sumPrice(order.order_items) + order.delivery_fee)}
            </div>
        },

        Header : 'Invoice',
        accessor : order => {
            return <div>
              <Link to={`/invoice/${order._id}`}>
                  <Button color="gray" iconBefore={<FaFileInvoiceDollar/>}>
                      Invoice
                  </Button>
              </Link>
            </div>
        },
    }
];
export default function UserOrders() {

    const [pesanan, setPesanan] = useState([]);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const fetchPesanan = useCallback(
        async () => {
            setStatus('process');

            let {data} = await getOrders({limit, page});

            if (data.error) {
                setStatus('error')
                return
            }

            setStatus('success')
            setPesanan(data.data)
            setCount(data.count)
        },
        [page, limit],
    );

    useEffect(() => {
        fetchPesanan();
       
    }, [fetchPesanan])
    return (
       <LayoutOne>
           <TopBar />
           <Text as="h3">Pesanan Anda</Text>
           <br/>

           <Table 
                items={pesanan}
                totalItems={count}
                columns={columns}
                onPageChange={page => setPage(page)}
                page={page}
                isLoading={status === 'process'}
           />
       </LayoutOne>
    )
}
