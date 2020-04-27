import HttpService from './HttpService';
import Login from '../pages/Login';
import StorageService from '../services/StorageService'


export default {
    login,
    signup,
    logout,
    updateWishList,
    removeItemFromWishList,
    updateRecentlyViewd,
    getRecntlyViewd,
    toggleWishList,
    getGeustWishList,
    itemFromWishList,
    removeItemFromGuestWishList,
    updateUser
};


async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    localStorage.setItem("token", user.token)
    return _handleLogin(user)
}

async function signup(userCred) {

    const user = await HttpService.post('auth/signup', userCred)
    localStorage.setItem("token", user.token)
    return  _handleLogin(user)
   
}

async function updateUser(user) {
    const updatedUser = await HttpService.put(`user/${user._id}`, user)
    return updatedUser
}


function _handleLogin(user) {
    console.log(user,'loasfasf');
    
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}


async function updateWishList(item, user) {
    const userWishList = user.wishlist
    const wishlist = [...userWishList, item]
    let updatedUser = { ...user, wishlist }
    const newUser = await HttpService.put(`user/$updatedUser._id}`, updatedUser)
    return newUser
}

async function removeItemFromWishList(itemId, user) {
    const userWishList = user.wishlist
    const wishlist = userWishList.filter(item => item._id !== itemId)
    let updatedUser = { ...user, wishlist }
    const newUser = await HttpService.put(`user/${updatedUser._id}`, updatedUser)
    return newUser
}

async function updateRecentlyViewd(entitiy, item) {
    let recentlyViewd = ''
    const currData = await getRecntlyViewd()

    const found=currData.find(itemWatched=>itemWatched._id===item._id)
    if (found) return
    
    if (currData.length === 3) {

        currData.shift()
        currData.push(item)
        StorageService.clearStorage('recently')
        return recentlyViewd = await StorageService.postMany(entitiy, currData)
    }
    else return recentlyViewd = await StorageService.post(entitiy, item)

}

async function getRecntlyViewd() {
    const reventlyViewd = await StorageService.query('recently')
    return reventlyViewd


}


async function toggleWishList(item) {
   let itemToToggle=await itemFromWishList(item._id)

 let updatedItem= await (!itemToToggle)? StorageService.post('wishlist',item) : StorageService.remove('wishlist',item._id)
 
 
return updatedItem

// let wishlist=await StorageService.query('wishlist')

// const itemIdx = wishlist.find(wishListItem =>
//     wishListItem._id === item._id)
//     wishlist=(itemIdx === undefined) ?
    
   
//     wishlist=StorageService.query('wishlist')
//     return wishlist

}

 function getGeustWishList(){
const wishlist = StorageService.getwishlist('wishlist')
return wishlist
}

function itemFromWishList(itemId) {
const item=StorageService.get('wishlist',itemId)
return item
} 


function removeItemFromGuestWishList(itemId) {
const item=StorageService.remove('wishlist',itemId)
return item
} 