import ItemService from '../services/ItemService'

export function loadItems(filterBy) {


    return async dispatch => {
        try {
            const items = await ItemService.query(filterBy);
            dispatch(setItems(items));
        } catch (err) {
            console.log('ItemActions: err in loadItems', err);
        }
    }
}

function setItems(items) {

    return {
        type: 'SET_ITEMS',
        items
    }
}

export function saveItem(item) {
    return async dispatch => {
        try {
            if (!item._id) {

                // item._id = _makeId();
                delete item._id
                const addedItem = await ItemService.add(item);
                dispatch({ type: 'ITEM_ADD', addedItem })
            } else {

                const editedItem = await ItemService.put(item);
                dispatch({ type: 'ITEM_UPDATE', editedItem });
            }
        } catch (err) {
            console.log('ITEMS Actions: err in EDIT ITEM');
        }
    }
}



export function setCurrentItem(itemId) {
    return async dispatch => {
        try {
            const item = await ItemService.get(itemId);
            await dispatch({ type: 'SET_ITEM', item })
        } catch (err) {
            console.log('ReviewActions: err in loadReviews', err);
        }

    }
}


export function deleteItem(itemId) {
   
    return async dispatch => {
        try {
            const item = await ItemService.remove(itemId);
            await dispatch({ type: 'DELETE_ITEM', itemId })

        } catch (err) {
            console.log('ItemsActions: err in loadReviews', err);
        }

    }
}




