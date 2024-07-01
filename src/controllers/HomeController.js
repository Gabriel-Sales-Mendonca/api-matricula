class HomeController {
    async index(req, res) {
        return res.json('ola mundo!')
    }
}

module.exports = new HomeController()