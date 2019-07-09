const Article = require('../database/models/Articles');
const path = require('path');


module.exports = (req,res)=> {
    
    
    let query = {_id:req.body.articleId}
    const {image} = req.files
        const uploadFile = path.resolve(__dirname,'..','public/articles',image.name);
        image.mv(uploadFile, (error)=>{
            Article.findOneAndUpdate(query, {...req.body, image: `/articles/${image.name}`}, function(error, post){
                    if(error){
                         res.redirect('/editArticles')
                            return;      
                    }else{
                            res.redirect('/');                                                       
                    }
                     }); 
             })
    };
    