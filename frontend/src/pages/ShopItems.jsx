import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadItems } from '../actions/ItemActions'
import Filter from '../cmps/items/Filter'

import ItemsList from '../cmps/items/ItemList'
import emptyCart from '../styles/assets/imgs/emptyCart.png'
import InnerNavBar from '../cmps/InnerNavBar';
import Footer from '../cmps/Footer'
import { Link } from 'react-router-dom'

class ShopItems extends Component {
  state = {
    isOwner: false,
    filterBy: {
      size: [],
      gender: [],
      itemOwner: [],
      price: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    var params = this.props.match.params.searchTerm

    this.checkIfOwner()

    if (!this.props.history.location.search) {

      if (params) {
        if (params === 'women' || params === 'men') {
          this.props.loadItems({ 'gender': [params] })
        } else if (params === 'petit') this.props.loadItems({ 'size': ['xs', 's'] })
        else if (params === 'clearance') this.props.loadItems({ 'price': 40 })
        else if (params === 'winter' || params === 'boho' || params === 'hipster' || params === 'accessories' || params === 'summer') {
          this.props.loadItems({ 'labels': [params] })
        }
        else this.props.loadItems({ 'txt': params })
      }
      else this.props.loadItems()

    }

    else this.setFilterInState()

  }




  setFilterInState = () => {
    let sizeFilter = this.getUrlSearchParams(this.props.history.location.search, 'size')
    let genderFilter = this.getUrlSearchParams(this.props.history.location.search, 'gender')
    let itemOwnerFilter = this.getUrlSearchParams(this.props.history.location.search, 'itemOwner')
    let priceFilter = this.getUrlSearchParams(this.props.history.location.search, 'price')

    if (sizeFilter === null) return
    this.setState(prevState => ({
      ...prevState, filterBy: { ...prevState.filterBy, size: sizeFilter.split('+'), gender: genderFilter.split('+') || [], itemOwner: itemOwnerFilter.split('+') || [], price: priceFilter || '' }
    }),

      () => {
        this.props.loadItems(this.state.filterBy)
      })


  }









  getUrlSearchParams = (searchStr, specificParamName) => {
 
    if (!searchStr || searchStr.length < 3) return null;
    const params = searchStr.split('?')[1].split('&').reduce((acc, item) => {
      const [param, value] = item.split('=');
      acc[param] = value;
      return acc;
    }, {});
    return params ? (specificParamName ? params[specificParamName] : params) : null;
  }









  checkIfOwner = () => {
    const user = (this.props.loggedInUser && this.props.loggedInUser.shopId) ? this.setState({ isOwner: true }) : null

  }

  selectFilter = (ev) => {

    let { name, value } = ev.target;

    if (name !== 'price') {

      var list = [...this.state.filterBy[name]]
      var idx = list.indexOf(value)

      if (idx >= 0) {
        list.splice(idx, 1)
        value = list
      } else {
        value = list.concat(value)
      }
    }

    this.setState(prevState => ({
      ...prevState,
      filterBy: {
        ...prevState.filterBy, [name]: value
      }
    }),
      () => this.setUrl()
    )

  }

  setUrl = () => {

    let sizeStr = this.state.filterBy.size.length === 0 ? '' : this.state.filterBy.size.length > 1 ? this.state.filterBy.size.join('+') : this.state.filterBy.size
    let genderStr = this.state.filterBy.gender.length === 0 ? '' : this.state.filterBy.gender.length > 1 ? this.state.filterBy.gender.join('+') : this.state.filterBy.gender
    let itemOwner = this.state.filterBy.itemOwner.length === 0 ? '' : this.state.filterBy.itemOwner.length > 1 ? this.state.filterBy.itemOwner.join('+') : this.state.filterBy.itemOwner
    this.props.loadItems(this.state.filterBy)
    this.props.history.push(`/item?size=${sizeStr}&gender=${genderStr}&itemOwner=${itemOwner}&price=${this.state.filterBy.price}`)

  }





  render() {
    const { items } = this.props;
    return (
      <React.Fragment>
        <InnerNavBar isOwner={this.state.isOwner}></InnerNavBar>
        <Filter filterBy={this.state.filterBy} selectFilter={this.selectFilter}></Filter>
        <div className="flex grow">
          {items.length !== 0 ? <ItemsList items={items}>
          </ItemsList> :
            <div className="noitems flex grow">
              <img src={emptyCart}></img>
              <div className="noitems-txt">
                <p className="oops">OOPS!</p>
                <p className="noitems-p">There’re no products matching your search, we’ll do better next time😎 </p>
                <Link to={`/item`}> <button className="btn1">Back to the shop</button></Link>
              </div>


            </div>}
        </div>
        <Footer></Footer>
      </React.Fragment>)
  }
}

const mapStateToProps = state => {
  return {
    items: state.item.items,
    filter: state.item.filter,
    sort: state.item.sorts,
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopItems);


