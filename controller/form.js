const path = require('path')
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const { where } = require('sequelize')
exports.loadWeb = (req,res,next)=>{



    res.sendFile(path.join(__dirname,'public','index.html'))
}

exports.createBlog =  (req,res,next)=>{
    console.log("new form ",req.body)

    Blog.create({title:req.body.title,author:req.body.author,content:req.body.content})
    .then(d=>{
        res.json(d)
    })
    .catch(e=>{
        console.log(e)
    })

}


exports.getBlogs = (req,res,next)=>{
    Blog.findAll({
        include: ["comments"],
    })
    .then(d=>{
        res.json(d)
    }).catch(e=>{
        console.log(e)
    })
}

exports.addComment = (req,res,next)=>{
    console.log("comment ",req.body)

    // Comment.create({comment:req.body.comment,})

    Blog.findByPk(req.body.id)
    .then(d=>{
        // console.log("blog d",d)
        return d.createComment({comment:req.body.comment})
    })
    .then(d=>{
        console.log("after creating ",d)
        res.json(d)
    })
    .catch(e=>{
        console.log(e)
    })


}


exports.delComment = (req,res,next)=>{
    console.log("aa",req.params)

    Comment.findByPk(req.params.id)
    .then(d=>{
        return d.destroy()
    })
    .then(res=>{
        console.log(res)
    }).catch(e=>{
        console.log("e",e)
    })
}

