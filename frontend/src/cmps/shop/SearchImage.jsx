import React, { Component } from 'react';
import UnsplashService from '../../services/UnsplashService';

import close from '../../styles/assets/imgs/close.png';


class SearchImage extends Component {

    state = {
        images: []
    }

    handleSearch = async ev => {
        const searchKey = ev.target.value;
        let results = await UnsplashService.SearchImage(searchKey)
        this.setState({ images: results.data.results })
    }


    // handleClick = (ev) => {
    //     // console.log(imgUrl);
    //     // console.log('handleClick', ev.target);

    // }



    render() {
        let images = this.state.images.map(img => {
            return (
                <img key={img.urls.thumb} src={img.urls.regular} alt={this.props.alt} name={this.props.name} onClick={this.props.handleSettingChange}></img>
            )
        })

        return (
            <div className="screen">
                <div className="modal-search-image">
                    <button onClick={this.props.toggleSearchImage}><img src={close} /></button>
                    <div className="head">
                        <h2> Search for the perfect Image</h2>
                        <input onChange={this.handleSearch} />
                    </div>
                    <div className="images-container">
                        {images}
                    </div>

                </div>
            </div>
        )


    }
}

export default SearchImage