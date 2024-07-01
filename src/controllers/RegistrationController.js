const Student = require('../models/Student')
const Courses = require('../models/Courses')
const Students_courses = require('../models/student_course')
const { where } = require('sequelize')

class RegistrationController {
    async register(req, res) {
        try {
            const { student_id, course_id } = req.body

            if(!student_id || !course_id) return res.status(400).json({
                errors: ['Os campos STUDENT_ID e COURSE_ID são obrigatórios']
            })
    
            const student = await Student.findByPk(student_id)
    
            if(!student) return res.status(404).json({
                errors: ['Estudante não encontrado']
            })
    
            const course = await Courses.findByPk(course_id)
    
            if(!course) return res.status(404).json({
                errors: ['Curso não encontrado']
            })
    
            const registration = await student.addCourse(course)
        
            if(!registration) return res.status(409).json({
                response: ['Esse aluno já está matriculado nesse curso']
            })
    
            const studentsId = registration[0].dataValues.students_id
            const coursesId = registration[0].dataValues.courses_id
    
            return res.json({
                students_id: studentsId,
                courses_id: coursesId
            })

        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async showStudents(req, res) {
        try {
            const { student_id } = req.params

            if(!student_id) return res.status(400).json({
                errors: ['O campo ID é obrigatório']
            })
    
            const student = await Student.findOne({
                where: {id: student_id},
                include: [Courses]
            })
    
            if(!student) return res.status(404).json({
                errors: ['Aluno não encontrado']
            })
    
            return res.json(student)

        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async showCourses(req, res) {
        try {
            const { courses_id } = req.params

            if(!courses_id) return res.status(400).json({
                errors: ['O campo ID é obrigatório']
            })
    
            const course = await Courses.findOne({
                where: { id: courses_id},
                include: [Student]
            })
    
            if(!course) return res.status(404).json({
                errors: ['Curso não encontrado']
            })
    
            return res.json(course)

        } catch(e) {
            return res.status(400).json({
                errors: ['Ocorreu um erro'],
                erro: e
            })
        }
    }

    async delete(req, res) {
        const { student_id, course_id } = req.body

        if(!student_id || !course_id) return res.status(400).json({
            errors: ['Os campos STUDENT_ID e COURSE_ID são obrigatórios']
        })

        const student = await Student.findOne({ where: { id: student_id } })

        if(!student) return res.status(404).json({
            errors: ['Aluno não encontrado']
        })

        const course = await Courses.findOne({ where: { id: course_id } })

        if(!course) return res.status(404).json({
            errors: ['Curso não econtrado']
        })

        const registration = await Students_courses.findOne({
            where: {
                students_id: student_id,
                courses_id: course_id
            }
        })

        if(!registration) return res.status(404).json({
            errors: ['Matrícula não encontrada']
        })

        await Students_courses.destroy({ where: { id: registration.id } })

        return res.json({
            status: ['Matrícula apagada com SUCESSO']
        })
    }
}

module.exports = new RegistrationController()