import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import ReviewRating from '../reviews/ReviewRating';
import heart from '../../styles/assets/imgs/icons/002-heart.png';
import heartfilled from '../../styles/assets/imgs/icons/003-heart-1.png';

import { addToWishList, removeFromWishList } from '../../actions/UserActions';
import Avatar from '@material-ui/core/Avatar';
import editIcon from '../../styles/assets/imgs/edit _icon.png';
import deleteIcon from '../../styles/assets/imgs/trash.png';
import UserService from '../../services/UserService';

class ItemPreview extends Component {
  state = {
    heart: heart,
    hover: false,
    heartbeat: ''
  }


  componentDidMount = async () => {
    let itemInWishList = await UserService.itemFromWishList(this.props.item._id)
    let itemIcon = (!itemInWishList) ? heart : heartfilled
    this.setState({ heart: itemIcon })


  }


  generateBtns = () => {
    switch (this.props.listMode) {
      case "cartMode":
        return (<div>
          < button className="btn2" onClick={() => this.handleDelete(this.props.item._id)}>X</button>
        </div>
        )
      case "wishListMode":
        return (<div>
          <button className="btn1" onClick={() => this.handleAddToCart(this.props.item)}>Add To Cart</button>
        </div>
        )

      case "adminMode":

        return (<React.Fragment>
          {this.state.hover ?
            <div className="item-edit-panel" >
              <button onClick={() => this.handleEdit(this.props.item)}><img src={editIcon} /></button>
              <button onClick={() => this.handleDelete(this.props.item._id)}><img src={deleteIcon} /></button>
            </ div>

            : ''}</React.Fragment>)


      // (<div className={this.state.hover ? "item-edit-panel" : "display-none"} >
      //   <button onClick={() => this.handleDelete(this.props.item._id)}><img src={deleteIcon} /></button>
      //   <button onClick={() => this.handleEdit(this.props.item)}><img src={editIcon} /></button>
      // </ div>)

      // "item-edit-panel"

      case "customerMode":
        return (
          <div>
          </div>
        )

      default:
        break;
    }
  }


  // toggleHover = () => {
  //   this.setState({ hover: !this.state.hover })
  // }

  //i had a bug so i had to split it to 2

  onMouseHover = () => {
    this.setState({ hover: true })
  }

  onMouseOut = () => {
    this.setState({ hover: false })
  }





  handleDelete = (itemId) => {

    this.props.deleteItem(itemId)
  }


  handleEdit = (item) => {
    this.props.editItem(item)

  }


  handleAddToCart = (item) => {
    this.props.addToCart(item)
  }

  calculateAvgRating = () => {
    const { reviews } = this.props.item
    const ratingSum = reviews.reduce((acc, review) => {


      return acc += +review.rate
    }, 0)
    const avgRating = Math.floor(ratingSum / reviews.length / 5 * 100)
    return avgRating

  }


  onAddToWishList = async () => {
    let item = await UserService.toggleWishList(this.props.item)
    let itemIcon = (!item) ? heart : heartfilled
    this.setState({ heart: itemIcon })

    let removedItem = await (this.props.listMode === 'wishListMode') ? this.props.deleteItem(this.props.item._id) : null
    if (this.state.heartbeat === 'heartbeat') {
      this.setState({ heartbeat: '' })
    }
    else this.setState({ heartbeat: 'heartbeat' })
  }

  render() {



    let icon = this.state.heart
    return (<React.Fragment>
      <div className="item-card" onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseOut}>

        {this.props.listMode !== 'adminMode' ?
          <img onClick={this.onAddToWishList} className={`heart-icon ${this.state.heartbeat}`} alt="heart" src={icon} /> : null}


        <Link to={`/itemDetails/${this.props.item._id}`}>

          <img className="item-img" alt="img-item" src={this.props.item.imgs[0]}></img>

          {/* <div className="card-desc"> */}
          {/* <img className="item-avatr" alt="img-item" src={avatar} /> */}

          <div className="details">


            <div className="brand flex align-center ">
              <Avatar alt="" src={this.props.item.itemOwner.logoUrl} style={{ backgroundColor: "lightgray" }} />
              <h4 className="brand-name"> {this.props.item.itemOwner.name}</h4>
            </div>


            <h3 className="item-title">{this.props.item.title}</h3>


            <div className="price-star">

              <p className="item-price">${Number.parseFloat(this.props.item.price).toFixed(2)}</p>
              {this.props.item.reviews &&
                <ReviewRating amount={this.props.item.reviews.length} rate={this.calculateAvgRating()}></ReviewRating>}

              {/* </div> */}


            </div>
          </div>
        </Link>
        {this.generateBtns()}
      </div>

    </React.Fragment >
    )
  }
}



const mapStateToProps = (state) => {

  return {
    loggedInUser: state.user.loggedInUser
  };
};

const mapDispatchToProps = {
  addToWishList,
  removeFromWishList,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPreview);