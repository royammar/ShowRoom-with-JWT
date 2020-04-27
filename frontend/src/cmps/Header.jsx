import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../styles/imgs/logo-red.png';
import { NavLink } from 'react-router-dom'
import Search from '../cmps/items/Search';
import cover from '../styles/assets/imgs/coverPhoto.jpg'
import bell from '../styles/assets/imgs/icons/notification.png'
import wishlist from '../styles/assets/imgs/heart-white.png'
import cart from '../styles/assets/imgs/shopping-cart-white.png'
import SocketService from '../services/SocketService'
import OrderService from '../services/OrderService'
import { addShopToUser, logout } from '../actions/UserActions'
import { CreateNewShop } from '../actions/ShopActions'
import { withRouter } from 'react-router'
import Labels from '../cmps/items/Labels'

import close from '../styles/assets/imgs/left-arrow-white.png'
import menu from '../styles/assets/imgs/menu.png'

import Modal from '../cmps/Modal'


class Header extends Component {

  state = {
    isTop: true,
    newOrders: 0,

    isOpen: '',

    modalMsg: "",

  };



  componentDidMount() {
    const listenToOrders = (this.props.loggedInUser && this.props.loggedInUser.shopId !== '') ?
      this.listenToOrders() : null

    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
  }



  componentWillUnmount = () => {
    SocketService.terminate()
  }

  listenToOrders = () => {
    SocketService.setup()
    SocketService.on('order-complete', this.loadMyOrders)
  }

  loadMyOrders = async () => {


    const orders = await OrderService.getMyOrders(this.props.loggedInUser.shopId)
    const newOrders = orders.find(order => !order.isRead)
    if (newOrders) {
      await this.setState({ newOrders: 1 })
      await this.setState({ modalMode: true, modalMsg: "You Have a New Order" })
      this.setState({ modalMode: false, modalMsg: "" })
    }

  }

  getShopId = async () => {
    if (!this.props.loggedInUser) return this.props.history.push(`/login`)
    if (this.props.loggedInUser.shopId) {
      this.props.history.push(`/shop/${this.props.loggedInUser.shopId}`)


    }
    else {

      let shop = (this.props.loggedInUser && this.props.loggedInUser.shopId !== "") ? this.props.loggedInUser.shopId :


            await this.props.CreateNewShop(this.props.loggedInUser._id, this.props.loggedInUser.fullName)
      
           
            
        console.log(shop._id);
        
        let newUser = await this.props.addShopToUser(shop._id, this.props.loggedInUser)
        this.props.history.push(`/shop/${newUser.shopId}`)

    }
  }

  toggleMenu = () => {
    if (this.state.isOpen === '') this.setState({ 'isOpen': 'open' })
    else this.setState({ 'isOpen': '' })
  }

  render() {
    return <React.Fragment>

      <Modal msg={this.state.modalMsg}></Modal>

      <div className="main-header flex column" >
        <img class={`menu-btn flex self-end`} onClick={this.toggleMenu} src={menu}></img>
        <div className={this.state.isTop ? `down nav-icon flex end align-center ${this.state.isOpen}` :
          `up nav-icon flex end align-center ${this.state.isOpen}`} >

          <div className="nav-text">
            <img className={`close-btn ${this.state.isOpen}`} onClick={this.toggleMenu} src={close}></img>
            <div className="nav-text-inner">
              <span><NavLink to='/item' exact>Explore</NavLink></span>

              <span onClick={this.getShopId}>My shop</span>

              {this.props.loggedInUser === null ? <NavLink to='/login' exact> Sign in</NavLink> :
                <button className="logout" onClick={this.props.logout}>Log out</button>}
            </div>
          </div>
        

          <ul className="menu-icons flex align-center">
<li>  {this.props.loggedInUser && this.props.loggedInUser.shopId !== '' ?
           <NavLink to='/dashboard' className="inner-nav-text" exact><img className="bell-icon" src={bell} />
              <span className="notification-seller-badge">{this.state.newOrders > 0 && this.state.newOrders}</span>
            </NavLink>
            : ''}</li>
            <li><NavLink activeClassName="active" to='/wishlist' exact><img src={wishlist} /></NavLink></li>
            <li className="cart"><NavLink activeClassName="active" to='/cart' exact><img src={cart} /> <span></span></NavLink></li>
          </ul>
        </div>
        <div className="header-text-search flex column justify-center align-center">
          <div className="headlines ">
            <h1 className="showRoom-title text-flicker-in-glow">ShowRoom.</h1>
            <h3 className="marketplace-title text-flicker-in-glow">Marketplace</h3>
          </div>

          <Search></Search>
          <Labels></Labels>

        </div>
        <img className="cover-photo" src={cover} />

      </div>
    </React.Fragment>
  }
}




const mapStateToProps = state => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = {
  CreateNewShop,
  addShopToUser,
  logout
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
