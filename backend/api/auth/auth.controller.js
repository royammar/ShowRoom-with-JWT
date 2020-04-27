const authService = require('./auth.service')
const logger = require('../../services/logger.service')
const jwt = require('jsonwebtoken');


async function login(req, res) {
    console.log(req);
    
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        req.session.user = user;
    //////////////
        const token=jwt.sign({user},"secret",{expiresIn:"1h"})
        console.log(token,'token');
        user.token=token
//////////////

        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}


async function signup(req, res) {
    console.log('check3', req.body);

    try {
        const { email, password, username, fullName, wishlist,imgUrl, shopId } = req.body
        logger.debug(email + ", " + username + ', ' + password + ',' + fullName + ',' + wishlist + ',' + shopId)
        const account = await authService.signup(email, password, username, fullName, wishlist,imgUrl, shopId)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(email, password, username, fullName, wishlist,imgUrl, shopId)
        console.log('user1', user);
       /////////////////////
       const token=jwt.sign({user},"secret",{expiresIn:"1h"})
       console.log(token,'token');
       user.token=token

       /////////////

        req.session.user = user

        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}