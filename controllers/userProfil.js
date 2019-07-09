const User = require('../database/models/UserCreate');


module.exports =  async (req,res)=>{
    const sess = req.session
    const user = await User.findById(req.session.userId)

    
    res.render('userProfil',  {user,sess})
}
