const user = require ('../database/models/UserCreate');


module.exports = (req,res,next)=>{


    user.findById(req.session.userId,(err, usr)=>{

        if (err){
        
        }
        if(usr){

            if(usr.isAdmin){

            res.locals.admin = true;
        }

        }
        
       next()
       })
       
}