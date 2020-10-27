import React , {useEffect} from 'react'
import 'upkit/dist/style.min.css';
import { HashRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './app/store'
import {listen} from './app/listener'


import Home from './pages/Home';
import Register from './pages/Register';


function App() {

  // panggil func listen sekali aja kekita komponen selesai dirender pertama kali
  useEffect(() => {
    listen()
    
  }, [])

  return (
   <Provider store={store}>
     <Router>
       <Switch>
         <Route path="/register" component={Register} />
         <Route path="/" component={Home}/>
       </Switch>
     </Router>
   </Provider>
  );
}

export default App;
