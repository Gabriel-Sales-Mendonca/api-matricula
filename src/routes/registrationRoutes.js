const { Router } = require('express')

const registrationController = require('../controllers/RegistrationController')

const route = new Router()

route.post('/', registrationController.register)
route.get('/students/:student_id', registrationController.showStudents)
route.get('/courses/:courses_id', registrationController.showCourses)
route.delete('/', registrationController.delete) // rota para apagar uma matrícula

module.exports = route