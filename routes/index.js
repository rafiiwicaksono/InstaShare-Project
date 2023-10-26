const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.get('/',Controller.landingPage)//redirect ke login

router.get('/login',Controller.login)//isi Users
router.post('/login',Controller.postLogin)

router.get('/signup',Controller.signup)//isi Profile dan User
router.post('/signup',Controller.signupPost)

router.get('/home',Controller.home)//menampilkan Post,addPost dan button menuju profile
router.get(`/home/:id/like`, Controller.likePost)//nambah like post
router.get(`/home/:id/delete`, Controller.deletePost)
router.get('/home/addPost', Controller.addPost)//form nambahin post
router.post('/home/addPost', Controller.createPost)


router.get('/profile', Controller.profile)//menampilkan profile

router.get('/profile/:id/edit', Controller.editProfile)//edit profile
router.post('/profile/:id/edit', Controller.updateProfile)


router.get('/logout',Controller.logout)//logout



module.exports = router