const Sequelize = require('sequelize');
require('dotenv').config();

let host = process.env.HOST;
let user = process.env.USER;
let password = process.env.PASSWORD;
let database = process.env.DATABASE;

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:5432/${database}`);

sequelize.authenticate()
    .then(() => {
        console.log('connection has been established successsfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

module.exports = { sequelize, Sequelize };