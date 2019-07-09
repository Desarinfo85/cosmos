const dotenv = require('dotenv').config();

const algoliasearch = require('algoliasearch');
var client = algoliasearch('TNZ7T909BY', process.env.ADMIN_KEY);

module.exports = (req,res)=>{
            
            if(req.query.q){


        var queries = [{

        indexName: 'dev_STEF',
        query : req.query.q,
        params : {
        hitsPerPage: 8
        }
        }]
        client.search(queries, function(err, data) {

        res.locals.response = data.results && data.results[0] && data.results[0].hits ? data.results[0].hits : []
        res.render('index')
        });
        }else{
        res.render('index')
    }        
}