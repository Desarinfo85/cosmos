const Article = require('../database/models/Articles');
const User = require('../database/models/UserCreate');



module.exports = async (req,res) =>{
    const sess = req.session
   await User.find({},null,{sort:{name:1}},(err,usr)=>{

    for (i = 0; i < usr.length; i++){
        usr[i]= {
            _id: usr[i]._id,
            name: usr[i].name,
            email: usr[i].email,
            pseudo: usr[i].pseudo,
            surname: usr[i].surname,
            lsNumber: `${i}`,
        }
    }
    Article.find({},(err, dbArticle)=>{

        for (i = 0; i < dbArticle.length; i++){

            dbArticle[i]={

                _id: dbArticle[i]._id,
                title: dbArticle[i].title,
                author: dbArticle[i].author,
                createDAte: dbArticle[i].createDAte,
                active: dbArticle[i].active,
                arNumber: `${i+1}`
            }
        }
        res.render('admin',{ usr, dbArticle, sess})
    })

 })

}





