const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAlgolia = require('mongoose-algolia');
const dotenv = require('dotenv').config();


let article = new Schema({
    title: String,
       content: String,
       author: String,
       image: String,
       createDate: {
           type: Date,
           default: new Date()
       },
       modifiedDate: Date,
    
       active: {
           type: Boolean,
           default: true
       }
  });

  article.plugin(mongooseAlgolia,{
    appId: process.env.APP_KEY,
    apiKey: process.env.ADMIN_KEY,
    indexName: 'dev_STEF', //The name of the index in Algolia, you can also pass in a function
    selector: 'title', //You can decide which field that are getting synced to Algolia (same as selector in mongoose)
  
    
    filter: function(doc) {
      return !doc.softdelete
    },
    debug: true // Default: false -> If true operations are logged out in your console
  });
  let Article = mongoose.model('article', article);
 
  Article.SyncToAlgolia();
  Article.SetAlgoliaSettings({
      searchableAttributes: ['title','content','author'] //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
    }); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings)
      
 module.exports = Article;
