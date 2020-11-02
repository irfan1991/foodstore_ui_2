import React, { useState } from 'react'
import { LayoutOne, Text, Steps } from "upkit";
import TopBar from '../../components/TopBar'
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import FaAddressCard from '@meronex/icons/fa/FaAddressCard';
import FaInfoCircle from '@meronex/icons/fa/FaInfoCircle';

const IconWrapper = ({children}) => {
    return <div className="text-3xl flex justify-center">
        {children}
    </div>
}

const steps = [
    { label : 'Item', icon : <IconWrapper><FaCartPlus/></IconWrapper>},
    { label : 'Alamat', icon : <IconWrapper><FaAddressCard/></IconWrapper>},
    { label : 'Konfirmasi', icon : <IconWrapper><FaInfoCircle/></IconWrapper>},
];


export default function Checkout() {

    const [activeStep, setActiveStep] = useState(0);
    return (
        <LayoutOne>
            <TopBar/>
            <Text as="h3">Checkout</Text>

            <Steps
            steps={steps}
            active={activeStep}
            />
        </LayoutOne>
    )
}