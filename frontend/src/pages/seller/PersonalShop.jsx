import React, { Component } from 'react';
import { connect } from 'react-redux';

import Utils from '../../services/UtilService';
import ItemService from '../../services/ItemService';
import CloudinaryService from '../../services/CloudinaryService';


import { loadShop, updateShopSettings } from '../../actions/ShopActions';
import { loadItems, deleteItem, saveItem } from '../../actions/ItemActions';
import { addToCart } from '../../actions/OrderActions';

import ItemsList from '../../cmps/items/ItemList';
import EditItem from '../../cmps/items/EditItem';
import ShopSettings from '../../cmps/shop/ShopSettings';
import HeaderShop from '../../cmps/shop/HeaderShop';
import InnerNavbar from '../../cmps/InnerNavBar';
import Footer from '../../cmps/Footer';
import Loading from '../../cmps/Loading';

import addBtn from '../../styles/assets/imgs/add.png';

class PersonalShop extends Component {
    state = {
        isOnEditMode: false,
        isOnEditSettigs: false,
        isOnChat: false,
        isOwner: false,
        isLoadingImgHeader: false,
        isLoadingImgItem: false,
        isOnSearchImage: false,

        item: '',

        shop: ''
    }



    async componentDidMount() {
        await this.props.loadItems({ 'itemOwner': this.props.match.params.id })

        await this.props.loadShop(this.props.match.params.id);
        this.setState({ shop: this.props.shop.selectedShop })

        this.checkIfOwner();
        this.clearItemState();

    }


    clearItemState() {
        let newItem = ItemService.getNewItem();
        newItem.itemOwner.id = this.props.match.params.id;
        newItem.itemOwner.name = this.state.shop.info.name;
        newItem.itemOwner.logoUrl = this.state.shop.style.logoUrl;

        this.setState(_ => ({
            item: newItem
        }))
    }



    notifciation = () => {
        this.props.addToCart();
    }


    checkIfOwner = () => {
        const user = (this.props.loggedInUser && this.props.loggedInUser.shopId === this.props.match.params.id)
            ? this.setState({ isOwner: true }) : null
    }



    handleColorChange = (ev) => {

        const name = 'bgColor';
        const type = 'style';
        let value = ev.hex;

        this.setState(prevState => ({
            ...prevState,
            shop: {
                ...prevState.shop,
                [type]: {
                    ...prevState.shop[type],
                    [name]: value
                }
            }
        }))
    }


    handleSettingChange = async (ev) => {


        let { name, value, alt, src } = ev.target;

        if (name === 'videoUrl') {
            value = Utils.getEmbdedUrl(value);
        }

        if (name === 'coverImgUpload' || name === 'logoUrl') {
            if (name === 'coverImgUpload') {
                name = 'coverImgUrl'
            }
            this.setState({ isLoadingImgHeader: true });

            const res = await CloudinaryService.uploadImg(ev);
            value = res.url;

            this.setState({ isLoadingImgHeader: false })

        } else {
            if (name === 'coverImgUrl') {
                value = src
            }
        }


        this.setState(prevState => ({
            ...prevState,
            shop: {
                ...prevState.shop,
                [alt]: {
                    ...prevState.shop[alt],
                    [name]: value
                }
            }
        }))
    }

    handleFormChange = async (ev) => {
        let { name, value } = ev.target;

        switch (name) {
            case 'labels':
                var list = [...this.state.item[name]];
                var i = list.indexOf(value)

                if (i >= 0) {
                    list.splice(i, 1)
                    value = list
                }
                else {
                    value = list.concat(value);
                }
                break;

            case 'price':
                value = parseInt(value)
                break;

            case 'imgs':

                const id = +ev.target.id
                this.setState({ isLoadingImgItem: true });

                var list = [...this.state.item[name]];
                const res = await CloudinaryService.uploadImg(ev);
                let resUrl = res.url;
                list[id] = resUrl;
                value = list;

                this.setState({ isLoadingImgItem: false })
                break;

        }

        this.setState(prevState => ({

            ...prevState,
            item: {
                ...prevState.item, [name]: value
            }
        }))

    }



    onSaveSettings = (ev) => {
        ev.preventDefault();

        this.props.updateShopSettings(this.state.shop);
        this.setState({ isOnEditSettigs: false })

    }

    onEditSettings = () => {
        this.setState(state => ({
            isOnEditSettigs: !state.isOnEditSettigs
        })
        )
    }

    onEditMode = () => {
        this.setState(state => ({
            isOnEditMode: !state.isOnEditMode,
        }))
        window.scrollTo(0, 400)

    }

    onAdd = () => {
        this.clearItemState();
        this.onEditMode();

        if (this.state.isOnEditSettigs) {
            this.onEditSettings();

        }
    }

    onChat = () => {
        this.setState(state => ({
            isOnChat: !state.isOnChat
        }))

    }

    onSaveItem = async (ev) => {
        ev.preventDefault();
        await this.props.saveItem(this.state.item);
        this.props.loadItems({ 'itemOwner': this.props.match.params.id })
        this.clearItemState();
        this.onEditMode()

    }



    editItem = (item) => {
        this.setState(prevState => ({
            ...prevState,
            item
        }))
        this.onEditMode();

    }




    render() {
        const { shop } = this.state;
        return (
            <React.Fragment>
                {this.state.shop ?
                    <div className='shop-page' style={{ backgroundColor: shop.style.bgColor }}>

                        <InnerNavbar isOwner={this.state.isOwner}></InnerNavbar>

                        <div className={this.state.isOnEditSettigs ? 'modal-opened shop-container' : 'full-width shop-container'}>
                            <HeaderShop isOwner={this.state.isOwner} Loading={this.state.isLoadingImgHeader} onEditSettings={this.onEditSettings} isOnEditSettigs={this.state.isOnEditSettigs} selectedShop={shop}></HeaderShop>

                            {this.state.isOnEditSettigs ?
                                <ShopSettings onSaveSettings={this.onSaveSettings} handleColorChange={this.handleColorChange} handleSettingChange={this.handleSettingChange} shop={this.state.shop} />
                                : null}

                            {this.state.item ?
                                <div className='shop-main'>
                                    {this.state.isOnEditMode ?
                                        <EditItem Loading={this.state.isLoadingImgItem} onSaveItem={this.onSaveItem} handleFormChange={this.handleFormChange} item={this.state.item}></EditItem> : null}
                                </div>
                                : null}

                            {this.state.isOwner ?
                                <button className='add-item-btn' onClick={this.onAdd}>
                                    <img src={addBtn} className={this.state.isOnEditMode ? 'tranform45' : ''} alt='icon-add' />
                                </button> : null}

                            <div className='cards-shop-container'>


                                {this.props.items ? <ItemsList editItem={this.editItem} deleteItem={this.props.deleteItem} items={this.props.items}
                                    listMode={this.state.isOwner ? 'adminMode' : ''} /> : null}

                            </div>


                        </div>
                    </div>

                    : <div className="loading-shop"> <Loading /> </div>}
                <Footer></Footer>
            </React.Fragment >)
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop,
        items: state.item.items,
        loggedInUser: state.user.loggedInUser,
    };
};

const mapDispatchToProps = {
    loadShop,
    loadItems,
    deleteItem,
    updateShopSettings,
    saveItem,
    addToCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalShop);
