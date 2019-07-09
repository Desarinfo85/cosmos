const User = require('../database/models/UserCreate');

module.exports = (req,res,next)=>{

    if(req.session.userId){

        res.redirect('/')
    }
    next()
}

