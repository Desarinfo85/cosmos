module.exports =  (req, res)=>{
  const sess = req.session
    if(req.session.userId){
      return  res.render('article/add', {sess})
    }else{
        res.redirect('/')
    }
}


