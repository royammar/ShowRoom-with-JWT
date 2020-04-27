import { combineReducers } from 'redux';
import OrderReducer from './OrderReducer';
import ShopReducer from './ShopReducer';
import UserReducer from './UserReducer';
import ItemReducer from './ItemReducer';

const rootReducer = combineReducers({
    order: OrderReducer,
    shop: ShopReducer,
    user: UserReducer,
    item: ItemReducer
})

export default rootReducer;