const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.get('/',Controller.landingPage)//redirect ke login

router.get('/login',Controller.login)//isi Users
router.post('/login',Controller.postLogin)

router.get('/signup',Controller.signup)//isi Profile dan User
router.post('/signup',Controller.signupPost)

router.get('/home',Controller.home)//menampilkan Post,addPost dan button menuju profile

// router.get(`/home/incerement/:id`)//nambah like post

// router.get('/home/profile/edit',Controller)//edit profile
// router.post('/home/profile/edit',Controller)

// router.get('/addPost')//form nambahin post
// router.post('/addPost')

// router.get('/logout')//logout



module.exports = router