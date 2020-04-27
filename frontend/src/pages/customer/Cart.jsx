import React, { Component } from 'react';
import { connect } from 'react-redux'
import orderService from '../../services/OrderService'
import ItemsList from '../../cmps/items/ItemList'
import { placeOrder, clearCart, removeFromCart } from '../../actions/OrderActions'
import InnerNavBar from '../../cmps/InnerNavBar';
import SocketService from '../../services/SocketService'
import { Link } from 'react-router-dom'
import Footer from '../../cmps/Footer'
import Modal from '../../cmps/Modal'


class Cart extends Component {

    state = {
        items: [],
        modalMsg: "",
    }

    componentDidMount = async () => {
        SocketService.setup()
        const cart = await orderService.getOrder()
        this.setState({ items: cart })
    }

    componentWillUnmount = () => {

        SocketService.terminate()
    }

    deleteItem = async (itemId) => {
        await orderService.removeItemFromCart(itemId)
        const cart = await orderService.getOrder()
        this.props.removeFromCart()
        this.setState({ items: cart })
    }


    calculateTotal = () => {
        const totalPrice = this.state.items.reduce((acc, item) => {
            return acc += +item.price
        }, 0)
        return totalPrice
    }

    onPlaceOrder = async () => {



        await this.props.placeOrder(this.props.loggedInUser)
        await this.clearCart()
        SocketService.emit('buy', this.state.items)
        await this.setState({ modalMode: true, modalMsg: "Order Submitted" })
        this.setState({ modalMode: false, modalMsg: "" })
        this.props.clearCart()
        // this.props.history.push("/")
    }

    clearCart = async () => {
        orderService.clearCart()
    }
    render() {
        return (<div className="cart ">
            <InnerNavBar></InnerNavBar>
            <Modal msg={this.state.modalMsg}></Modal>
            <div className="container">
                {/* <p className="cart-title">SHOPPING CART</p> */}
                {this.state.items && this.state.items.length > 0 ?
                <div className="cart-price">
                                <div className="flex justify-space-between ">
                                    <p className="cart-total"> Subtotal</p>
                                    <p className=" cart-total"> ${this.calculateTotal()}</p>
                                </div>
                                <div  className="flex justify-space-between">
                                    <p className="cart-total">Tax (17%)</p>
                                    <p className="cart-total">${Math.floor(this.calculateTotal() * 0.17)}</p>
                                </div>
                                <div  className="flex justify-space-between total-to-pay">
                                    <p  className="cart-total">TOTAL</p>
                                    <p  className="price cart-total">${Math.floor(this.calculateTotal() * 0.17)+this.calculateTotal()}</p>
                                </div>
                                <button className="place-order btn1" onClick={this.onPlaceOrder}>PLACE ORDER</button>
                            </div>
                     :""}


                <div className="cart-body flex justify-space-between">
              
                    {this.state.items && this.state.items.length > 0 ?
                        <div className="container flex justify-space-around">

                            <div className="cart-list flex justify-center align-center">
                                <ItemsList deleteItem={this.deleteItem} listMode="cartMode" items={this.state.items}></ItemsList>
                            </div>
                            
                        </div> :
                        <div className="cart-no-items container flex column justify-center">
                            <p className="oops">OOPS!</p>
                            <p className="empty-line">YOUR SHOPPING CART IS EMPTY</p>
                            <p className="cart-paragraph">We know that you want to checkout quickly but you forgot something very important...</p>
                            <Link to={`/item`}> <button className="btn1">Go shopping</button> </Link>
                        </div>
                    }


                </div>
            </div>
            <Footer></Footer>
        </div >
        )
    }


}







const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};

const mapDispatchToProps = {
    placeOrder,
    clearCart,
    removeFromCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
