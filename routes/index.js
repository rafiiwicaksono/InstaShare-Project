const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.get('/',Controller.redirect)//redirect ke login

router.get('/login',Controller.login)//isi Users
router.post('/login',Controller)

router.get('/signup',Controller)//isi Profile dan User
router.post('/signup',Controller)

router.get('/home',Controller)//menampilkan Post,addPost dan button menuju profile

router.get('/home/profile',Controller)//menampilkan profile

router.get('/home/profile/edit',Controller)//edit profile
router.post('/home/profile/edit',Controller)

router.get('/addPost')//form nambahin post
router.post('/addPost')

router.get('/logout')//logout



module.exports = router