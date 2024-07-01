const validator = require('validator')

const Student = require('../models/Student')

class StudentsController {
    async register(req, res) {
        
        try {
            const { name, email } = req.body

            if(!name) return res.status(400).json({
                errors: ['Campo NAME é obrigatório']
            })
    
            if(!email) return res.status(400).json({
                errors: ['Campo EMAIL é obrigatório']
            })
    
            if(!validator.isEmail(email)) return res.status(400).json({
                    errors: ['Email inválido']
            })
    
            const emailExists = await Student.findOne({ where: { email: email } })
    
            if(emailExists) {
                return res.status(409).json({
                    errors: ['O email informado já está cadastrado']
                })
            }
    
            const student = await Student.create({ name: name, email: email })
    
            return res.json({
                id: student.id,
                name: student.name,
                email: student.email
            })
        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async index(req, res) {

        try {
            const students = await Student.findAll({
                attributes: ['id', 'name', 'email']
            })
    
            return res.json(students)
        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro na busca dos dados'],
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
    
            const student = await Student.findByPk(id)
    
            if(!student) return res.status(404).json({
                errors: ['Aluno não encontrado']
            })
    
            return res.json({
                id: student.id,
                name: student.name,
                email: student.email
            })
        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro na busca dos dados'],
                erro: e
            })
        }
    }

    async update(req, res) {

        try{
            const { id, name, email } = req.body

            if(!id) return res.status(400).json({
                errors: ['O campo ID é obrigatório']
            })
    
            const student = await Student.findByPk(id)
    
            if(!student) return res.status(404).json({
                errors: ['Aluno não encontrado']
            })
    
            const studantUpdated = await Student.update({
                name: name, email: email
            }, {
                where: {
                    id: id
                },
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
        const { id } = req.body

        if(!id) return res.status(400).json({
            errors: ['O campo ID é obrigatório']
        })

        const student = await Student.findByPk(id)

        if(!student) return res.status(404).json({
            errors: ['Aluno não encontrado']
        })

        await Student.destroy({ where: { id: id } })

        return res.json({
            status: ['Aluno apagado com SUCESSO']
        })
    }
}

module.exports = new StudentsController()