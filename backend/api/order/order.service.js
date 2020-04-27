const dbService = require('../../services/db.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    query,
    update,
    add
    // getById,
    // getByEmail,
    // remove,
}

async function add(order) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.insertMany(order);
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert order`)
        throw err;
    }
}


async function query(shopId) {
    const criteria = {"fromShop.id":`${shopId}`}
    console.log('criteria',criteria);
    
    const collection = await dbService.getCollection('order')
    try {
        const orders = await collection.find(criteria).toArray();
        return orders
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }
}


async function update(order) {
    const collection = await dbService.getCollection('order')
    order._id = ObjectId(order._id);

    try {
        await collection.replaceOne({"_id":order._id}, {$set : order})
        return order
    } catch (err) {
        console.log(`ERROR: cannot update order ${order._id}`)
        throw err;
    }
}



// async function getById(orderId) {
//     console.log('orderid',orderId)
//     const collection = await dbService.getCollection('order')
//     try {
//         const order = await collection.findOne({"_id":ObjectId(orderId)})
        // delete order.password

        // order.givenReviews = await reviewService.query({byorderId: ObjectId(order._id) })
        // order.givenReviews = order.givenReviews.map(review => {
        //     delete review.byorder
        //     return review
        // })
     
    //     return order
    // } catch (err) {
    //     console.log(`ERROR: while finding order ${orderId}`)
    //     throw err;
    // }
    // }
// async function getByEmail(email) {
//     const collection = await dbService.getCollection('order')
//     try {
//         const order = await collection.findOne({email})
//         return order
//     } catch (err) {
//         console.log(`ERROR: while finding order ${email}`)
//         throw err;
//     }
// }

// async function remove(orderId) {
//     const collection = await dbService.getCollection('order')
//     try {
//         await collection.deleteOne({"_id":ObjectId(orderId)})
//     } catch (err) {
//         console.log(`ERROR: cannot remove order ${orderId}`)
//         throw err;
//     }
// }



// function _buildCriteria(filterBy) {
//     const criteria = {};
//     if (filterBy.txt) {
//         criteria.ordername = filterBy.txt
//     }
//     if (filterBy.minBalance) {
//         criteria.balance = {$gte : +filterBy.minBalance}
//     }
//     return criteria;
// }


