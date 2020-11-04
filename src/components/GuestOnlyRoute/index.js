import React from 'react'
import { Route , Redirect} from 'react-router-dom'
import { useSelector } from "react-reduxt";

export default function GuestOnlyRoute({children , ...rest}) {
    
    let {user} = useSelector(state => state.auth);
    return (
       <Route {...rest}>
           {!user  ? children  : <Redirect to="/login" />}
       </Route>
    )
}
