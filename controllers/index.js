class Controller {
    static home(req, res) {
        try {
            res.send(`HALOOO HOME`)
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }
}

module.exports = Controller