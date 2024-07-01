const Courses = require('../models/Courses')

class CoursesController {
    async register(req, res) {
        try{
            const { name } = req.body

            if(!name) return res.status(400).json({
                errors: ['O campo NAME é obrigatório']
            })
    
            const nameExists = await Courses.findOne({ where: { name: name } })
    
            if(nameExists) return res.status(409).json({
                errors: ['Esse curso já está cadastrado']
            })
    
            const course = await Courses.create({ name: name })
    
            return res.json({
                id: course.id,
                name: course.name
            })
        }catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async index(req, res) {
        try{
            const courses = await Courses.findAll({
                attributes: ['id', 'name']
            })

            return res.json(courses)
        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params

            if(!id) return res.status(400).json({
                errors: ['O campo ID é obrigatório']
            })
    
            const course = await Courses.findByPk(id)
    
            if(!course) return res.status(404).json({
                errors: ['Curso não encontrado']
            })
    
            return res.json({
                id: course.id,
                name: course.name
            })
        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async update(req, res) {
        try {
            const { id, name } = req.body

            if(!id) return res.status(400).json({
                errors: ['O campo ID é obrigatório']
            })
    
            const course = await Courses.update({
                id: id, name: name
            }, {
                where: {
                    id: id
                }
            })
    
            return res.json({
                status: ['Dados atualizados com SUCESSO']
            })
        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.body

            if(!id) return res.status(400).json({
                errros: ['O campo ID é obrigatório']
            })
    
            const course = await Courses.findByPk(id)
    
            if(!course) return res.status(404).json({
                errors: ['Curso não encontrado']
            })
    
            await Courses.destroy({ where: { id: id } })
    
            return res.json({
                status: ['Curso apagado com SUCESSO']
            })
        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }
}

module.exports = new CoursesController()