const Article = require('../database/models/Articles');

module.exports = async (req,res)=>{

 article = await Article.findById(req.params.id)
    res.render('articles', {article})

};