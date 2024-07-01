const { Router } = require('express')

const studentsController = require('../controllers/StudentsController')

const route = new Router()

route.post('/', studentsController.register)
route.get('/', studentsController.index)
route.get('/:id', studentsController.show)
route.put('/', studentsController.update)
route.delete('/', studentsController.delete)

module.exports = route