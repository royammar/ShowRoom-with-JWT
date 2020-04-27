
const initalState = {

    //for future use
    shops: [],
    selectedShop: null,
    comments: []

}

export default function (state = initalState, action = {}) {
    switch (action.type) {
        case 'SET_SHOP':
            return { ...state, selectedShop: action.shop }
        case 'ADD_SHOP':
            return { ...state, shops: [...state.shops, action.newShop] }

        case 'SET_SETTINGS':
            console.log('SET_SETTINGS - reducer', action);
            return { ...state, selectedShop: action.shopToUpdate }

        case 'ADD_COMMENT':
            console.log('ADD_COMMENT', action);
            return { ...state, comments: [...state.comments, action.addedComment] }

        default:
            return state
    }

}

