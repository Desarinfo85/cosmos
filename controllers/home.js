const Article = require('../database/models/Articles');

module.exports = async (req,res)=>{
   const sess = req.session
   const posts = await Article.find({}).sort({_id:-1}).limit(12) 
   res.render('index', {posts, sess});
   
       }
