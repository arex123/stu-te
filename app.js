const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const sequelize = require('./database')
app.use(express.static(path.join(__dirname,'public')))

const Blog = require('./models/Blog')
const Comment = require('./models/Comment')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
const formRoutes = require('./routes/form')

app.use(formRoutes)

Blog.hasMany(Comment,{ as: "comments" })
Comment.belongsTo(Blog)

// let stuname = ['Aditya','kunal','alex','john','abrar','sohail','anisha','tanisha','vaibhav']


sequelize
// .sync({force:true})
.sync()
.then(res=>{
    app.listen(3001)
})
.catch(e=>{
    console.log(e)
})