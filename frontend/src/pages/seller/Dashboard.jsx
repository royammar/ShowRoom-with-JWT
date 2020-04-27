import React, { Component } from 'react';
import { connect } from 'react-redux'
import OrderService from '../../services/OrderService'
import { Divider } from '@material-ui/core';
import InnerNavBar from '../../cmps/InnerNavBar';
import Avatar from '@material-ui/core/Avatar';
class Dashboard extends Component {

    state = {
        orders: null
    }

    componentDidMount =  () => {
        window.scrollTo(0, 0)
        if(this.props.loggedInUser===null||this.props.loggedInUser.shopId==='') return this.props.history.push('/')
        else this.loadOrders()
        
    }

    componentWillUnmount = () => {
      if(this.props.loggedInUser===null||this.props.loggedInUser.shopId==='') return
      OrderService.setOrdersAsRead(this.state.orders)
    }

    loadOrders=async()=>{

        const orders = await OrderService.getMyOrders(this.props.loggedInUser.shopId)
        this.setState({ orders })


    }



    renderOrders = () => {
        const sortedOrders=this.state.orders.reverse()
        
        
        
        const data = this.state.orders.map(order => {

            return (<div  className={order.isRead? "row" : "row newOrder"}>
                <div className="cell flex" data-title="Customer Name">
                   <div>{order.byUser.name}</div> 
                </div>
                <div className="cell flex" data-title="Customer Image">
                <Avatar src={order.byUser.imgUrl} alt=""></Avatar>
                </div>
                <div className="cell flex" data-title="Product title">
                   <div>{order.product.title}</div> 
                </div>
                <div className="cell flex" data-title="Price">
                    ${order.product.price}
                </div>
                {/* <div className="cell flex" data-title="Product Image">
                    <img src={order.product.imgUrl} alt=""/>
                </div> */}
                <div className="cell flex" data-title="Order Date">
                    {order.boughtAt}
                </div>
            </div>
            )
        })
        return data

    }





    render() {
        return (
            < React.Fragment>
            <InnerNavBar></InnerNavBar>
                <div className="limiter">
                    <div className="container-table100">
                {/* <button className="btn1" onClick={this.goBack}>back</button> */}
                        <div className="wrap-table100">
                            <div className="table">

                                <div className="row header">
                                    <div className="cell">
                                        Customer
							</div>
                                    <div className="cell">
                                        Image
							</div>
                                    <div className="cell">
                                        Item
							</div>
                    
                                    <div className="cell">
                                        Price
							</div>
                                    {/* <div className="cell">
                                        Item Image
							</div> */}
                                    <div className="cell">
                                        Order Date
							</div>
                                </div>
                                {this.state.orders &&
                                    this.renderOrders()}

                            </div>
                        </div>
                    </div>
                </div>


            </React.Fragment>)

    }

}


const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);



