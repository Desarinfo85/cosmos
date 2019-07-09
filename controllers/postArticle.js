const path = require('path')
const Article = require('../database/models/Articles');

module.exports = (req,res)=>{
    
    const {image} = req.files
    const uploadfile = path.resolve(__dirname, '..', 'public/articles', image.name)
      image.mv(uploadfile, ()=>{
          Article.create({
             ...req.body,
             image: `/articles/${image.name}`
          },(error, post)=>{
           res.redirect('/')
        });     
     })
 };
 