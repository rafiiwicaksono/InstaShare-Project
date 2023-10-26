class Controller {

    static landingPage(req,res){
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