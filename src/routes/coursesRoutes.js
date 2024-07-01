const { Router } = require('express')

const coursesController = require('../controllers/CoursesController')

const route = new Router()

route.post('/', coursesController.register)
route.get('/', coursesController.index)
route.get('/:id', coursesController.show)
route.put('/', coursesController.update)
route.delete('/', coursesController.delete)

module.exports = route