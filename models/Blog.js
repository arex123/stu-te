const Sequelize = require('sequelize')

const sequelize = require('../database')

const Blog = sequelize.define('Blog',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING
    },
    author:{
        type:Sequelize.STRING
    },
    content:{
        type:Sequelize.STRING
    }
})

module.exports = Blog