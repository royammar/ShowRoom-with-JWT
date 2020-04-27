
const initalState = {
    items: [],
    selectedItem: null,
    filter: [],
    sorts: []

}

export default function (state = initalState, action = {}) {
    switch (action.type) {
        case 'SET_ITEMS':
            // console.log('SET_ITEMS', { ...state, items: action.items });
            return { ...state, items: action.items };

        //make sure the action is on the same name
        case 'ITEM_ADD':
            console.log('item - reducer- add', action);

            return { ...state, items: [...state.items, action.addedItem] };

        case 'ITEM_UPDATE':
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.item._id ? action.item : item
                )
            };

        case 'DELETE_ITEM':

            const itemsCopy = state.items.slice();
            const { itemId } = action;
            const idx = itemsCopy.findIndex(item => item._id === itemId);
            // debugger  
            itemsCopy.splice(idx, 1);

            return {
                ...state, items: [...itemsCopy]
            };

        case 'SET_ITEM':
            return { ...state, selectedItem: action.item };

        case 'SET_FILTERS':
            return ({ ...state, filter: [...state.filter, action.filters] })

        case 'REMOVE_FILTER':
            return {
                ...state, filter: state.filter.filter(curFilter => {
                    _checkMatchFilter(curFilter, action.filter)
                })
            }
        case 'SET_SORTS':
            return {
                ...state, sorts: [...state.sorts, action.sorts]
            }
        default:
            return state
    }
}

function _checkMatchFilter(curFilter, actionFilter) {
    let filterKey, filterValue, actionKey, actionValue;
    for (const key in curFilter) {
        filterKey = key;
        filterValue = curFilter[key]
        for (const key in actionFilter) {
            actionKey = key;
            actionValue = actionFilter[key]
        }
        if (filterKey === actionKey && filterValue === actionValue) return true
        return false

    }
}

