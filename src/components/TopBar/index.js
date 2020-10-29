import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import { Responsive, ButtonCircle } from "upkit";
import FaUser from "@meronex/icons/fa/FaUser";
import StoreLogo from '../StoreLogo'

export default function TopBar() {

    // dapat state auth
    let auth = useSelector(state => state.auth);
    return (
        <Responsive desktop={2} justify="between" items="center">
            <div>
                <StoreLogo />
            </div>

            <div className="mr-5 text-right">
                <Link to={auth?.user ? '/account' : '/login'}>
                    <div className="mr-2 inline-block text-blue-600 font-bold">
                        {auth?.user?.full_name}
                    </div>
                    <ButtonCircle
                     color="blue"
                     icon={FaUser}
                    />
                </Link>
            </div>
        </Responsive>
    )
}
