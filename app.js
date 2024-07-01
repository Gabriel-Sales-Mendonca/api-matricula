const express = require('express')
require('dotenv').config()

require('./src/database/index')

const homeRoutes = require('./src/routes/homeRoutes')
const studentsRoutes = require('./src/routes/studentsRoutes')
const coursesRoutes = require('./src/routes/coursesRoutes')
const registrationRoutes = require('./src/routes/registrationRoutes')

class App {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    routes() {
        this.app.use('/', homeRoutes)
        this.app.use('/students', studentsRoutes)
        this.app.use('/courses', coursesRoutes)
        this.app.use('/registration', registrationRoutes)
    }
}

module.exports = new App().app