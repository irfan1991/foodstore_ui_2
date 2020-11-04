import React , {useEffect} from 'react'
import { LayoutOne} from "upkit";
import TopBar from '../../components/TopBar';
import BounceLoader from 'react-spinners/BounceLoader';
import {logout} from '../../api/auth';
import { userLogout } from "../../features/Auth/actions";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

export default function Logout() {

let dispatch = useDispatch();
let history = useHistory();

useEffect(() => {
    logout()
    .then(() => dispatch(userLogout()))
    .then(() => history.push('/'))
}, [history, logout])
    return (
        <LayoutOne size="small">
            <div className="text-center flex flex-col justify-center items-center"> 
                <BounceLoader color="red" />
                <br />
                Logging out ...
            </div>
        </LayoutOne>
    )
}
