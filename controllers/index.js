
const {User, Profile, Post} = require(`../models`)
const { Op } = require("sequelize");

class Controller {

    static landingPage(req, res) {
        try {
            res.render('landingPage')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postLogin(req,res){
        try {
            console.log(req.body)
            res.redirect('/post')
        } catch (error) {
            res.send(error.message)
        }
      }

    static signup(req, res) {
        let { errors } = req.query
        try {
            res.render('signup', { errors })
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }

    static async signupPost(req, res) {
        try {
            console.log(req.body)
            const { username, email, password, role, firstName, lastName, dateOfBirth, gender, phone, profilePicture } = req.body
            let user = await User.create({ username, email, password, role })
            // console.log(user)
            if (user) {
                await Profile.create({ firstName, lastName, dateOfBirth, gender, phone, profilePicture, UserId: user.id })
                res.redirect(`/login`)
            } else {
                res.redirect(`/signup`)
            }
        } catch (error) {
            if (error.name === `SequelizeValidationError`) {
                let errors = error.errors.map((isi) => {
                    return isi.message
                })
                res.redirect(`/signup?errors=${errors}`)
            } else {
                res.send(error)
            }
        }
    }

    static async home(req, res) {
        let {search} = req.query
        let conditional = {}
        if (search) {
            conditional.username = {
                [Op.iLike]: `%${search}%`
            }
        }
        try {
            let post = await Post.findAll({
                include: {
                    association: 'User',
                    where : conditional
                }
            })
            res.render('home', {post})
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

    static async addPost(req, res) {
        try {
            let user = await User.findAll()
            res.render('addPost', {user})
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }


    static async createPost(req, res) {
        try {
            const {UserId, caption, imgUrl} = req.body
            await Post.create({UserId, caption, imgUrl})
            res.redirect(`/home`)
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }

    static async likePost(req, res) {
        try {
            await Post.increment({likes: 1}, {
                where: {
                    id: req.params.id
                }
            })
            res.redirect(`/home`)
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }

    static async deletePost(req, res) {
        try {
            await Post.deletePostMethod(req)
            res.redirect(`/home`)

        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }


    static async profile(req, res) {
        try {
            let profile = await Profile.findAll()
            res.render('profile', {profile})
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }

    static async editProfile(req, res) {
        try {
            let profile = await Profile.findByPk(req.params.id)
            res.render('editProfile', {profile})
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }

    static async updateProfile(req, res) {
        try {
            const {firstName, lastName, phone, bio, profilePicture} = req.body
            await Profile.update({firstName, lastName, phone, bio, profilePicture}, {
                where: {
                    id: req.params.id
                }
            })
            res.redirect(`/profile`)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }



      


}

module.exports = Controller