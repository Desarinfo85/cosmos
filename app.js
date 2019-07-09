                            //////////////////////////////////////////////////
                            ////                                         /////
                            ////           LES MODULES NPM               /////            
                            ////                                         /////
                            /////////////////////////////////////////////////

const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const StorageMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const {stripTags} = require('./helpers/helperhbs');


 
                            //////////////////////////////////////////////////
                            ////                                         /////
                            ////           LES CONTROLLERS               /////            
                            ////                                         /////
                            /////////////////////////////////////////////////

//ARTICLES
const home = require('./controllers/home');
const createArticle = require('./controllers/createArticle',);
const singleArticle = require('./controllers/singleArticle');
const postArticle = require('./controllers/postArticle');
const logout = require('./controllers/logout');
const IsAnAdmin = require('./controllers/panelAdmin');
const articleEdit = require ('./controllers/articleEdit');
const articleEditPost = require('./controllers/articleEditPost');
const deleteArticle = require('./controllers/deleteArticle');

//USERS & ADMIN

const userRegister = require('./controllers/userRegister');
const userLoginAuth = require('./controllers/loginAuth' );
const editProfil = require('./controllers/profilEdit');
const editProfilPost = require('./controllers/editProfilPost');
const deleteUser = require('./controllers/deleteUser');
const userProfil = require('./controllers/userProfil');
const activeArticles = require('./controllers/activeArticle');
const desactiveArticles = require('./controllers/desactiveArticle');
const algoliaSearch = require('./controllers/algolia');





const app = express();
app.use(fileUpload());
app.use(connectFlash());



//////////////////////////////////////////////////
////                                         /////
////           SECURITE + MONGO              /////            
////                                         /////
/////////////////////////////////////////////////
const db = require('./config/keys').MongoURI
mongoose
.connect(db , {useNewUrlParser: true, useCreateIndex:true})
.then(()=> console.log('connexion a mongo atlas'))
.catch(err => console.log(err))
const storageMongo = StorageMongo(expressSession)

app.use(expressSession({
    secret: 'secret',
    name: 'Coockie',
    resave: false,
    saveUninitialized: true,
    
    store: new storageMongo(
        
        {mongooseConnection: mongoose.connection}
        )
    }));
    
    //////////////////////////////////////////////////
    ////                                         /////
    ////              APPLICATION PARSE          /////            
    ////                                         /////
    /////////////////////////////////////////////////
    
    
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    
    
    //////////////////////////////////////////////////
    ////                                         /////
    ////            DOSSIER PUBLIC STATIC        /////            
    ////                                         /////
    /////////////////////////////////////////////////
    
    
    app.use(express.static('public'));
    
    
    //////////////////////////////////////////////////
    ////                                         /////
    ////         MOTEUR HANDLEBARS               /////            
    ////                                         /////
    /////////////////////////////////////////////////
    
    
    app.engine('.hbs', exphbs({
        //suprimme les balises de ckEditor
        helpers:{
            stripTags: stripTags
        },
        /////////////////////////////////
        extname: '.hbs'}));
        app.set('view engine', '.hbs');
        app.use('*',(req,res,next)=>{
            
            res.locals.user = req.session.userId;
            
            next()
            
        })
        
        
        //////////////////////////////////////////////////
        ////                                         /////
        ////        HELPERS HANDLEBARS.MOMENT        /////            
        ////                                         /////
        /////////////////////////////////////////////////
        
        
        var Handlebars = require("handlebars");
        var MomentHandler = require("handlebars.moment");
        MomentHandler.registerHelpers(Handlebars);
        
        //////////////////////////////////////////////////
        ////                                         /////
        ////               MIDDLEWARE                /////            
        ////                                         /////
        /////////////////////////////////////////////////
        
        const auth = require('./middleware/authentification');
        const validArticle = require('./middleware/middleware');
        const authSucces = require('./middleware/authSucces');
        const isAdmin = require('./middleware/isAdmin');
        app.use('/article/post', validArticle);
        app.use('/article/add', auth);
        app.use(isAdmin);
        
        
        //////////////////////////////////////////////////
        ////                                         /////
        ////                 ROUTES                  /////            
        ////                                         /////
        /////////////////////////////////////////////////
        
        app.get('/', home);
        
        
        //ARTICLES
        app.get('/articles/add',auth, createArticle);
        app.get('/articles/:id', singleArticle);
        app.post('/article/post', auth, postArticle, validArticle);
        //USERS
        app.post('/user/register',authSucces, userRegister);
        app.post('/login/Auth',authSucces, userLoginAuth);
        app.get('/logout', logout);
        app.get('/userProfil', userProfil);
      
        
        
        
        //ISADMIN
        
        app.get('/admin', IsAnAdmin);
        app.get('/editArticles/:id', articleEdit);
        app.post('/articles/edit/:id', articleEditPost);
        app.get('/articleDelete/:id', deleteArticle);
        app.get('/editUser/:id', editProfil);
        app.post('/edit/profile/:id' , editProfilPost);
        app.get('/userDelete/:id', deleteUser);
        app.get('/postActive/:id', activeArticles);
        app.get('/postUnactive/:id',desactiveArticles);
        app.get('/index',algoliaSearch );
        
       


//ERROR404
app.use( (req, res)=> {
    res.status(404).render('page404');
});
   
                            //////////////////////////////////////////////////
                            ////                                         /////
                            ////                 SERVER                  /////            
                            ////                                         /////
                            /////////////////////////////////////////////////
app.listen(4000, function(){
    console.log('le port d\' ecoute est le port 4000');
    
});
