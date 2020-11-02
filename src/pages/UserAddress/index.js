import React from 'react'
import TopBar from '../../components/TopBar'
import { useAddressData } from "../../hooks/address";
import { LayoutOne, Text, Table, Button } from "upkit";
import { Link } from 'react-router-dom'

const columns = [
    { Header : 'Nama', accessor : 'nama'},
    {Header : 'Detail' , accessor : alamat => {
        return <div>
            {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan}, {alamat.kelurahan}<br />
            {alamat.detail}
        </div>
    }}
]

export default function UserAddress() {

    let {
        data,
        limit ,
        page,
        status,
        count,
        setPage
    } = useAddressData();

    return (
        <LayoutOne>
            <div>
                <TopBar />
                <Text as="h3">
                    Alamat Pengirim

                </Text>
                <br />

                <Table 
                    items={data}
                    columns={columns}
                    totalItems={count}
                    page={page}
                    isLoading={status === 'process'}
                    perPage={limit}
                    onPageChange={page => setPage(page)}
                />

            </div>

            {status === 'success' &&  !data.length  ? <div className="text-center p-10">
                Kamu belum menentukan alamat Pengirim
                <Link to="/alamat-pengirim/tambah">
                    <Button>Tambah Baru</Button>
                </Link>
            </div> : null}
        </LayoutOne>
    )
}
