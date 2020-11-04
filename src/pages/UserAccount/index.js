import React from 'react'
import { LayoutOne, Text , Card, Responsive} from "upkit";
import TopBar from '../../components/TopBar';
import FaHome from '@meronex/icons/fa/FaHome';
import FaAddressBook from '@meronex/icons/fa/FaAddressBook';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaFileInvoice from '@meronex/icons/fa/FaFileInvoice';
import { Link } from 'react-router-dom'


const IconWrapper = ({children}) => {
    return <div className="text-white text-5xl flex justify-center mb-5">
        {children}
    </div>
};
const menus = [
    {label:'Beranda',value:<IconWrapper><FaHome/></IconWrapper>,url:'/'},
    {label:'Alamat',value:<IconWrapper><FaAddressBook/></IconWrapper>,url:'/alamat-pengirim'},
    {label:'Pesanan',value:<IconWrapper><FaFileInvoice/></IconWrapper>,url:'/pesanan'},
    {label:'Logout',value:<IconWrapper><FaArrowRight/></IconWrapper>,url:'/logout'}
];
export default function UserAccount() {
    return (
       <LayoutOne>
           <TopBar/>
                <Text as="h3">Akun Anda</Text>
                <br />

                <Responsive desktop={4} mobile={4} tablet={4}>
                    {menus.map((menu, index) => {
                        return <div  key={index} className="px-2 pb-2">
                            <Link to={menu.url}>
                                <Card 
                                    header={menu.value}
                                    body={<div className="text-center font-bold text-white">
                                        {menu.label}
                                    </div>}
                                />
                            </Link>
                        </div>
                    })}
                </Responsive>
       </LayoutOne>
    )
}
