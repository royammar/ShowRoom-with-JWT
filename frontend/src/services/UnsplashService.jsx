import Axios from 'axios';

export default {
    SearchImage
};


// import fetch from 'node-fetch';
// global.fetch = fetch;

async function SearchImage(searchKey) {
    const ACCESS_KEY = 'd1a51341029aa7004d724286f58d2dbe3f259de5f3282be2f93b5d0a1b657a5c';
    let results = Axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=50&orientation=landscape&query=${searchKey}&client_id=${ACCESS_KEY}`)
    return results

}


