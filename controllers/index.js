class Controller {
    static login(req, res) {
        try {
            res.render('login');
            
        } catch (error) {
            res.send(error.message)
        }
      }

    static async landing(req,res){
        try {
            res.render('landing')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = Controller