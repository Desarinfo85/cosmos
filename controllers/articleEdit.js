const Article = require('../database/models/Articles');


module.exports =  async (req,res)=>{
    const sess = req.session
    const article = await Article.findById(req.params.id)

    
    res.render('editArticles',  {article, sess})
}

