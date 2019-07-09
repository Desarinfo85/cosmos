const User = require('../database/models/UserCreate');


module.exports =  async (req,res)=>{
   
    const user = await User.findById(req.params.id)

    
    res.render('editUser',  {user})
}
