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
         <Route path="/register" component={Register} exact />
         <Route path="/register/berhasil">
           <RegisterSuccess />
         </Route>
         <Route path="/login">
           <Login />
         </Route>
      
       </Switch>
     </Router>
   </Provider>
  );
}

export default App;
