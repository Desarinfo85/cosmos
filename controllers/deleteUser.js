const User = require('../database/models/UserCreate')

module.exports = (req, res)=> {
  

User.findByIdAndRemove({_id: req.params.id}).then(function(user){})
res.redirect('/admin');

};