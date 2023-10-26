class Controller {

    static redirect(req,res){
        try {
            res.redirect('/login')
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

}

module.exports = Controller