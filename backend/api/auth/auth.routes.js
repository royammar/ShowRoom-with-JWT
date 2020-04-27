const express = require('express')
const {requireAuth,checkToken}  = require('../../middlewares/requireAuth.middleware')

const {login,signup,logout} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', requireAuth, logout)

module.exports = router