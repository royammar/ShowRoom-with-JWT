import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './styles/global.scss';

import ShopApp from './pages/ShopApp';
import SignUp from './pages/SignUp';
import ShopItems from './pages/ShopItems';
import Login from './pages/Login';
import ItemDetails from './pages/ItemDetails';
import About from './pages/About';
import PersonalShop from './pages/seller/PersonalShop';
import Dashboard from './pages/seller/Dashboard';
import Wishlist from './pages/customer/Wishlist';
import Cart from './pages/customer/Cart';
import Footer from './cmps/Footer';


const history = createBrowserHistory();

function App() {

  
  return <React.Fragment>
    <Router history={history}>

      <Switch>
        <Route component={ShopApp} path="/" exact></Route>
        <Route component={SignUp} path="/signup" exact></Route>
        <Route component={ShopItems} path="/item/:searchTerm?" exact></Route>
        <Route component={Login} path="/login" exact></Route>
        <Route component={Wishlist} path="/wishlist" exact></Route>
        <Route component={ItemDetails} path="/itemDetails/:id" exact></Route>
        <Route component={About} path="/about" exact></Route>
        <Route component={PersonalShop} path="/shop/:id" exact></Route>
        <Route component={Dashboard} path="/dashboard" exact></Route>
        <Route component={Cart} path="/cart" exact></Route>
      </Switch>
    </Router>
    {/* <Footer></Footer> */}
  </React.Fragment>
}

export default App;
