const Articles = require('../database/models/Articles');

module.exports =  (req,res)=>{

Articles.findByIdAndUpdate(req.params.id,
    {active: true},
    (err, article) =>{
        if(err){
            console.log(err);
            
        }
        res.redirect('/admin')
    })

}
