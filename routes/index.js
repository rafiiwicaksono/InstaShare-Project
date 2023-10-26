const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.get('/',Controller.redirect)

router.get('/login',Controller.login)

module.exports = router