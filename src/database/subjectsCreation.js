const { sequelize, Sequelize } = require("./connection")

const Subjects = sequelize.define('subjects', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    percentage: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {})

Subjects.sync({ force: false })

module.exports = Subjects;