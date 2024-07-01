const { Sequelize, Model } = require('sequelize')

class Courses extends Model {
    static init(connection) {
        super.init({
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize: connection
        })
    }

    static associate(model) {
        this.belongsToMany(model, { foreignKey: 'courses_id', through: 'students_courses' })
    }
}

module.exports = Courses