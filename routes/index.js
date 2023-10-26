const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.get('/',(req,res) => {
    res.redirect('/login')
})

router.get('/login',Controller.login)

module.exports = router