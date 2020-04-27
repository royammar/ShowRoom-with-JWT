const itemService = require('./item.service')

async function getItems(req, res) {

console.log('getItems6',req.query);


    const items = await itemService.query(req.query)

    res.send(items)
}

async function getItem(req, res) {
    let item = await itemService.getById(req.params.id)
    res.send(item)
}

async function updateItem(req, res) {

    let item = req.body;
    await itemService.update(item)
    res.send(item)
}


async function addItem(req, res) {
    let item = req.body
    item = await itemService.add(item)
    res.send(item)
}

async function deleteItem(req, res) {
   
    await itemService.remove(req.params.id)
    res.end()
}


module.exports = {
    getItems,
    getItem,
    updateItem,
    addItem,
    deleteItem
}

