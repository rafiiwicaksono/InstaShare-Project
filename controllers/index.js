const {User, Profile, Post} = require(`../models`)
class Controller {

        try {
            res.render('landingPage')
        } catch (error) {
            res.send(error.message)
        }
    }

    static login(req, res) {
        try {
            res.render('login');

        } catch (error) {
            res.send(error.message)
        }
    }

    static signup(req, res) {
        let {errors} = req.query
        try {
            res.render('signup', {errors})
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }

    static async signupPost(req, res) {
        try {
            const {username, email, password, role, firstName, lastName, dateOfBirth, gender, phone, profilePicture} = req.body
            let user = await User.create({username, email, password, role})
            if (user.id) {
                await Profile.create({firstName, lastName, dateOfBirth, gender, phone, profilePicture, UserId: user.id})
                res.redirect(`/login`)
            } else {
                res.redirect(`/signup`)
            }
        } catch (error) {
            if(error.name === `SequelizeValidationError`) {
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
        try {
            let post = await Post.findAll({
                include: {
                    model: User,
                    include: Profile
                }
            })
            res.send(post)
        } catch (error) {
            console.log(error.message)
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

}

module.exports = Controller