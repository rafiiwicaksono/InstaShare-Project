const { User, Profile, Post } = require(`../models`)
let bcrypt = require('bcryptjs');
class Controller {

    static landingPage(req, res) {
        try {
            res.render('landingPage')
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

    static login(req, res) {
        try {
            const { errors } = req.query;
            res.render('login', { errors })

        } catch (error) {
            res.send(error.message)
        }
    }



    static postLogin(req, res) {
        const { email, password } = req.body;
        const id = req.session.userId
        console.log(req.body)
        User.findOne({ where: { email } })
          .then((user) => {
            if (user) {
              const isValidPassword = bcrypt.compareSync(password, user.password);
              console.log(password)
              console.log(user.password)
            //   console.log(user.id)
            console.log(isValidPassword)
    
            console.log(user.id)
              if (isValidPassword) {
                req.session.userId = user.id;
                req.session.role = user.role;
                console.log(req.session)
    
                return res.redirect(`/home`);
              } else {
                const error = 'Sorry, your password was incorrect. Please double-check your password.';
                return res.redirect(`/login?errors=${error}`);
              }
            } else {
              const error = 'Sorry, your email was incorrect. Please double-check your email.';
              return res.redirect(`/login?errors=${error}`);
            }
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
      }

}

module.exports = Controller