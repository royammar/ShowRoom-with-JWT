import StorageService from './StorageService';
import HttpService from './HttpService'
export default {
    addItemtoCart,
    getOrder,
    removeItemFromCart,
    add,
    clearCart,
    getMyOrders,
    setOrdersAsRead
};


async function addItemtoCart(item) {
    const addeditem = await StorageService.post(`order`, item);
    return addeditem
}

async function getOrder() {
    const itemsInCart = await StorageService.query(`order`);
    return itemsInCart
}

async function removeItemFromCart(item) {
    const items = await StorageService.remove(`order`, item);
    return items

}

async function add(order) {
    const savedOrder = await HttpService.post('order', order)
    return savedOrder
}

async function clearCart() {
    StorageService.clearStorage('order')
}

async function getMyOrders(shopId) {

    const myOrders = await HttpService.get(`order/${shopId}`)
    return myOrders
}

async function setOrdersAsRead(orders) {
    console.log(orders);
    
    await orders.forEach(order => {
        order.isRead = true
        const savedOrder = HttpService.put(`order/${order._id}`, order)
    })

    return

}