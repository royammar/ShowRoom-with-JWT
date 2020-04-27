export default {
    getEmbdedUrl
};

function getEmbdedUrl(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp)
    if (match && match[2].length == 11) {
        return 'https://www.youtube.com/embed/' + match[2] + '/v/' + match[2] + '?playsinline=1&loop=1&autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&widgetid=2&playlist=' + match[2] + '>'
    }
    else {
        return ''
    }

}



function getNewItem() {

}

// let url = this.props.cmp.info;


