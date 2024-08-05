const Sequelize = require('sequelize')

const sequelize = require('../database')

const Comment = sequelize.define('Comment',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    comment:{
        type:Sequelize.STRING
    }
})

module.exports = Comment