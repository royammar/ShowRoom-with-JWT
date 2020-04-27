import React from 'react';
import hanger from '../../styles/assets/imgs/hanger.png';

export default function NoItems() {
    return (<React.Fragment>
        <div className="no-items">
            <div>
                <img src={hanger}></img>
                <p>No items yet...</p>
            </div>
        </div>
    </React.Fragment>)
}
