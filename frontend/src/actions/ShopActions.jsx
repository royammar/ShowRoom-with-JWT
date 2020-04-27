import ShopService from '../services/ShopService';

export function loadShop(shopId) {
    return async dispatch => {
        try {
            const shop = await ShopService.get(shopId);
            dispatch(setShop(shop));
        } catch (err) {
            console.log(`cant get shop ${shopId}`);
        }
    }

}


function setShop(shop) {
    return {
        type: 'SET_SHOP',
        shop
    }
}



export function updateShopSettings(shop) {
    return async dispatch => {
        try {
            const shopToUpdate = await ShopService.put(shop);
            await dispatch({ type: 'SET_SETTINGS', shopToUpdate })
        } catch (err) {
            console.log(`cant get shop - shop action ${shop._id}`);
        }
    }

}
export function CreateNewShop(userId, userName) {
    return async dispatch => {
        try {
            let shop = createShop(userId, userName)
            let newShop = await ShopService.add(shop);
            console.log(newShop._id,'action');
            
            dispatch({ type: 'ADD_SHOP', newShop });
            console.log('dispatched');
            
            return newShop
        } catch (err) {
            console.log(`cant add shop - shop action `);
        }
    }

}


export function saveComment(comment) {

    return async dispatch => {
        try {
            const commentToAdd = await ShopService.post(comment);
            await dispatch({ type: 'ADD_COMMENT', commentToAdd })
        }

        catch {
            console.log(`cant add Comment`);
        }
    }

}


function createShop(userId, userName) {

    let shop = {
        comments: [],
        info: {
            name: 'My Shop',
            description: 'Design Your Own Shop.',
            instagram: '',
            facebook: '',
        },
        owner: {
            id: userId,
            name: userName,
        },
        style: {
            bgColor: '#F6F3F3',
            theme: '',
            videoUrl: 'https://www.youtube.com/embed/MuoZso0khAY/v/MuoZso0khAY?playsinline=1&loop=1&autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&widgetid=2&playlist=MuoZso0khAY>',
            coverImgUrl: 'http://res.cloudinary.com/moriz/image/upload/v1582301186/vh1hytpdnkp6nnfuvwu9.png',
            logoUrl: 'http://res.cloudinary.com/moriz/image/upload/v1582038994/phjpzptnfulzaegw6jjd.png',
            darkMode: ''
        },

    }
    return shop
}


