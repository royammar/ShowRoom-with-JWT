import React from 'react';

import InstgaramIcon from '../../styles/assets/logo/insta.png';
import FacebookIcon from '../../styles/assets/logo/facebook.png';


import settingOpen from '../../styles/assets/imgs/icons/wizard-open.png';
import settingClose from '../../styles/assets/imgs/icons/wizard-close.png';
import Loading from "../../cmps/Loading";

export default function ShopSettings(props) {

    return <React.Fragment>
        {props.Loading ? <div className="loading-header"> <Loading /> </div> :
            <div className="shop-header" style={{ backgroundImage: 'url(' + props.selectedShop.style.coverImgUrl + ')' }}>


                {props.isOwner ?
                    <button onClick={props.onEditSettings} className='shop-edit-btn'>
                        <img src={props.isOnEditSettigs ? settingOpen : settingClose} />
                    </button> : null}

                <div className="shop-info">
                    <div className="details">
                        <img className="shop-logo" src={props.selectedShop.style.logoUrl} />
                        <h2 className="title">{props.selectedShop.info.name}</h2>
                        <div className="designer-name">
                            by {props.selectedShop.owner.name}</div>
                        <div className="description">{props.selectedShop.info.description}</div>

                        <iframe width="1200" height="250" title="video" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" className="shop-video" src={props.selectedShop.style.videoUrl}>
                        </iframe>
                        <div className="shop-social">
                            <div className="insta-icon">
                                <a href={props.selectedShop.info.instagram}>
                                    <img src={InstgaramIcon} alt="icon" />
                                </a>
                            </div>

                            <div className="fb-icon">
                                <a href={props.selectedShop.info.facebook}>
                                    <img src={FacebookIcon} alt="icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>}
    </React.Fragment>

}