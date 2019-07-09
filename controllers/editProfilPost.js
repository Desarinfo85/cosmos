const User = require('../database/models/UserCreate');

module.exports = (req,res)=>{
 
let profil = {_id:req.body.userId}
User.findByIdAndUpdate( profil, {...req.body},function(err, result){
    if(err){
        console.log(err);
    }else{
        res.redirect('/userProfil')
    }
  
});

}



