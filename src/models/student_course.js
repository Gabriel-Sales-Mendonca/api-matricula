const { Sequelize, Model } = require('sequelize')

class Students_courses extends Model{
    static init(connection) {
        super.init({
            students_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            courses_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize: connection
        })
    }
}

module.exports = Students_courses