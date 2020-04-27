import orderService from "../services/OrderService";

export function placeOrder(loggedInUser) {
    const miniUser = { id: loggedInUser._id, name: loggedInUser.fullName,imgUrl:loggedInUser.imgUrl}

    return async dispatch => {
        const order = await orderService.getOrder()
        
        const orderToSave = _createOrder(miniUser, order)
        
        try {
            
            const addedOrder =await orderService.add(orderToSave) 
            dispatch({
                type: 'SAVE_ORDER',
                orderToSave
            })
        }
        catch (err) {
            console.log(`Error placing order ${order}`);
        }
    }
}




function _createOrder(miniUser, order) {

    const orderToSave = order.map(item => {

        return {
            product: {
                id: item._id,
                title: item.title,
                size:item.size,
                price: item.price,
                imgUrl: item.imgs[0],
            },
            fromShop: {
                id: item.itemOwner.id,
                name: item.itemOwner.name
            },
            byUser: { ...miniUser },
            boughtAt: _getTime(),
            isRead:false
        }
    })
    return orderToSave
}



export function addToCart() {
    return async dispatch => {
        try {
           
            dispatch({type:'INC_CART'})
        } catch (err) {
            console.log('cant add to cart');
        }
    }

}
export function removeFromCart() {
    return async dispatch => {
        try {
           
            dispatch({type:'DEC_CART'})
        } catch (err) {
            console.log('cant add to cart');
        }
    }

}
export function clearCart() {
    return async dispatch => {
        try {
            dispatch({type:'CLEAR_CART'});
        } catch (err) {
            console.log('cant add to cart');
        }
    }

}

function _getTime() {

    let today = new Date(Date.now())
    var dd = today.getDate()
    var mm = today.getMonth() + 1; //As January is 0.
    var yy = today.getFullYear();
    var hh = today.getHours()
    var mi = today.getMinutes()
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let time = dd + '/' + mm + '/' + yy +" At: " + hh+":"+mi
    return time
}