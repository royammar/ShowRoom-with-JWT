import React, { Component } from 'react';
import { connect } from 'react-redux'
import ItemsList from '../../cmps/items/ItemList'
import { removeFromWishList } from '../../actions/UserActions'
import { addToCart } from '../../actions/OrderActions'
import OrderService from '../../services/OrderService';
import InnerNavBar from '../../cmps/InnerNavBar';
import { Link } from 'react-router-dom'
import Footer from '../../cmps/Footer'
import UserService from '../../services/UserService';

class Wishlist extends Component {

    state = {
        wishlist: []

    }

    componentDidMount = () => {
        this.setWishList()
    }

  

    setWishList = async() => {
        let wishlist = await UserService.getGeustWishList()

        this.setState({wishlist})
      
    }

    deleteItem =async (itemId) => {
        await UserService.removeItemFromGuestWishList(itemId)
        this.setWishList()
    }

    addToCart = (item) => {
        this.deleteItem(item._id)
        this.props.addToCart()
        OrderService.addItemtoCart(item)

    }

    render() {

        return (

            <div className="wishlist flex column">
                <InnerNavBar></InnerNavBar>


                <div className=" container flex grow">
                    {this.state.wishlist.length > 0 ?
                        <div>
                            <p className="wishlist-title flex justify-center">WISHLIST</p>
                            <ItemsList addToCart={this.addToCart} deleteItem={this.setWishList} listMode="wishListMode" items={this.state.wishlist}></ItemsList>
                        </div>
                        :
                        <div className="wishlist-txt">
                            <p>It seems nothing in here😭</p>
                            <p>Make a wish!</p>
                            <Link to={`/item`}> <button className="btn1">GO SHOPPING</button></Link>

                        </div>}
                </div>

                <Footer></Footer>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};

const mapDispatchToProps = {
    removeFromWishList,
    addToCart

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wishlist);
