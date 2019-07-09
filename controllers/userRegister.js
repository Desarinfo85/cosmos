const User = require('../database/models/UserCreate');

module.exports = (req,res)=>{

User.create(
    req.body, (error, user)=>{
        req.flash('data', req.body)[0]
        if(error){
            res.redirect('/');
        }
        res.redirect('/');
    }
  )

}