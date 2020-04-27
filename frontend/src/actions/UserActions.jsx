import UserService from '../services/UserService';


export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await UserService.login(userCreds);
      console.log(user,'login');
      
      dispatch(setUser(user));
    } catch (err) {
      console.log('UserActions: err in login user', err);
    }
  }
}

export function signup(userCreds) {

  return async dispatch => {
    const user = await UserService.signup(userCreds);
    console.log(user,'signup');
    dispatch(setUser(user));
  };
}


export function logout() {
  return async dispatch => {
    await UserService.logout();
    dispatch(setUser(null));
  };
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    user
  };
}

export function addToWishList(item, user) {
  return async dispatch => {

    const miniItem = await { _id: item._id, size: item.size, title: item.title, price: item.price, imgs: [item.imgs[0]], itemOwner: { id: item.itemOwner.id, name: item.itemOwner.name } }
    const updatedUser = await UserService.updateWishList(miniItem, user);
    dispatch(_updateUser(updatedUser))

  }

}


export function removeFromWishList(itemId, user) {

  return async dispatch => {
    const updatedUser = await UserService.removeItemFromWishList(itemId, user);
    dispatch(_updateUser(updatedUser))
  }
}


export function addShopToUser(shopId,user){
  user.shopId=shopId
  return async dispatch => {
    const updatedUser = await UserService.updateUser(user);
    dispatch(setUser(updatedUser));
    return updatedUser
  };
}


function _updateUser(user) {
  return {
    type: 'UPDATE_USER',
    user
  }
}


export function SetloggedInUser(userType) {
  return async dispatch => {
    let user = await getUserData(userType)

    dispatch(setUser(user))
  }
}




function getUserData(userType) {
  let user = ''
  if (userType === 'Customer') {

    user = {
      "_id": "5e248a7b1a0d5feaa843e506",
      "userName": "roy",
      "fullName": "Koral Simanovitch",
      "email": "roy1@gmail.com",
      "password": "123",
      "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk070JxVQGRKxRirmpZAi1BTEUdLZkJC9HHZYPXvo-xS7eOl0Weg&s",
      "wishlist": [],
      "shopId": ""

    }

  }
  else user = {
    "_id": "5e2364c31a0d5feaa843e505",
    "userName": "roy",
    "fullName": "roy amar",
    "email": "roy@gmail.com",
    "imgUrl": "https://scontent.ftlv1-2.fna.fbcdn.net/v/t1.0-9/10559713_10153073749172830_4028919375654008823_n.jpg?_nc_cat=110&_nc_ohc=ZSXUpO9enJcAX8_90u2&_nc_ht=scontent.ftlv1-2.fna&oh=88224c80c2a320270ff66a197828934b&oe=5E8DD8EF",
    "password": "123",
    "wishlist": [],
    "shopId": "5e230e471a0d5feaa843e503"
  }
  return user

}