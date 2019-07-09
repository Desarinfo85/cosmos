const Article = require('../database/models/Articles')

module.exports = (req, res)=> {
  

Article.findByIdAndRemove({_id: req.params.id}).then(function(article){})
res.redirect('/');

};