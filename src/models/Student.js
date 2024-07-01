const { Sequelize, Model } = require('sequelize')

class Student extends Model{
    static init(connection) {
        super.init({
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            email:  {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Email inválido'
                    }
                }
            }
        }, {
            sequelize: connection
        })
    }

    static associate(model) {
        this.belongsToMany(model, { foreignKey: 'students_id', through: 'students_courses' })
    }
}

module.exports = Student