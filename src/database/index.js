const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Student = require('../models/Student')
const Courses = require('../models/Courses')
const Students_courses = require('../models/student_course')

const connection = new Sequelize(dbConfig)

Student.init(connection)
Courses.init(connection)
Students_courses.init(connection)

Student.associate(Courses)
Courses.associate(Student)

module.exports = connection