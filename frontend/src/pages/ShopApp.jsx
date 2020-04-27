import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../cmps/Header';
import { loadItems } from '../actions/ItemActions';
import ItemsList from '../cmps/items/ItemList';
import Footer from '../cmps/Footer';

import women from '../styles/assets/imgs/women2.jpg'
import shoes from '../styles/assets/imgs/shoes.jpg'
import men from '../styles/assets/imgs/men.jpg'
import hat from '../styles/assets/imgs/hat.jpg'


import { SetloggedInUser } from '../actions/UserActions'

class ShopApp extends Component {



    componentDidMount() {


        this.props.loadItems()
    }

    // componentDidUpdate() {

    //     this.props.loadItems()
    // }



    setUser = (ev) => {

        this.props.SetloggedInUser(ev.target.value)

    }


    render() {
        let { items } = this.props;
        var itemsHome = items.splice(0, 3)
        return <React.Fragment>
            <Header></Header>

            <div className=" home-categories">

                <Link to={`/item/clearance`} className="category-b" style={{ backgroundImage: `url( ${shoes})` }}>
                    <span className="home-page-text">CLEARANCE</span> </Link>

                <Link to={`/item/women`} className="category-c" style={{ backgroundImage: `url( ${women})` }}>
                    <span className="home-page-text">WOMEN</span></Link>

                <Link to={`/item/men`} className="category-d" style={{ backgroundImage: `url( ${men})` }}>
                    <span className="home-page-text">MEN</span></Link>

                <Link to={`/item/petit`} className="category-e" style={{ backgroundImage: `url( ${hat})` }}>
                    <span className="home-page-text">PETIT</span></Link>
            </div>
            <div className="hot-product">
                <span className="home-page-text">HOT PRODUCTS</span>

                {items.length !== 0 ? <ItemsList items={itemsHome}>
                </ItemsList> : 'NO ITEMS!'}

            </div>
            {/* <select onChange={this.setUser} name="User" >
                <option value="Shop Owner">Shop Owner</option>
                <option value="Customer">Customer</option>
            </select> */}
            <Footer></Footer>
        </React.Fragment>
    }
}



const mapStateToProps = state => {
    return {
        items: state.item.items,
        loggedInUser: state.user.loggedInUser
    };
};

const mapDispatchToProps = {
    loadItems,
    SetloggedInUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopApp);
