import React from 'react'

import ItemPreview from '../items/ItemPreview';
import { withRouter } from "react-router";
import NoItems from '../../cmps/items/NoItems';

function ItemList({ items, listMode, deleteItem, editItem, addToCart }) {

  return <React.Fragment>

    {items.length === 0 ? <NoItems /> : ''}





    <div className="cards-container container">
      {items ? items.map(item =>
        <ItemPreview editItem={editItem} deleteItem={deleteItem} addToCart={addToCart} listMode={listMode} key={item._id} item={item}  >
        </ItemPreview>) : null}  </div>
  </React.Fragment>

}
export default withRouter(ItemList)