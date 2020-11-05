import React , {useEffect} from 'react'
import 'upkit/dist/style.min.css';
import { HashRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './app/store'
import {listen} from './app/listener'


import Home from './pages/Home';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login'
import { getCart } from "./api/cart";
import Checkout from './pages/Checkout'
import UserAddressAdd from './pages/UserAddressAdd'
import UserAddress from './pages/UserAddress'
import Invoice from './pages/Invoice'
import UserAccount from './pages/UserAccount'
import UserOrders from './pages/UserOrders'
import Logout from './pages/Logout'
import GuarRoute from './components/GuardRoute'
import GuestOnlyRoute from './components/GuestOnlyRoute'

function App() {

  // panggil func listen sekali aja kekita komponen selesai dirender pertama kali
  useEffect(() => {
    listen()
    getCart();
  }, [])

  return (
   <Provider store={store}>
     <Router>
       <Switch>
       <Route path="/" component={Home} exact />
         <GuestOnlyRoute path="/register">
           <Register/>
         </GuestOnlyRoute> 
         <GuestOnlyRoute path="/register/berhasil">
           <RegisterSuccess />
         </GuestOnlyRoute>
         <GuestOnlyRoute path="/login">
           <Login />
         </GuestOnlyRoute>
         <GuarRoute path="/alamat-pengirim/tambah">
           <UserAddressAdd />
         </GuarRoute>
         <GuarRoute path="/alamat-pengirim">
           <UserAddress />
         </GuarRoute>
         <GuarRoute path="/checkout">
           <Checkout />
         </GuarRoute>
         <GuarRoute path="/account">
           <UserAccount />
         </GuarRoute>
         <Route path="/pesanan">
           <GuarRoute>
            <UserOrders />
           </GuarRoute>   
         </Route>
         <GuarRoute path="/logout">
           <Logout />
         </GuarRoute>
         <GuarRoute path="/invoice/:order_id">
           <Invoice />
         </GuarRoute>
       </Switch>
     </Router>
   </Provider>
  );
}

export default App;
