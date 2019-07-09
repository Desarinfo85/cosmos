const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({



name: {
    type: String,
    required: true,
  
},

surname:{
    type: String,
    

},
pseudo:{
    type: String,
    default: '',
  
},

email: {
    type: String,
    required: true,
    unique: true,
   
},

password:{
    type: String,
    required: true,
   
},

avatar:{
    type: String,
    default: '',
  
}, 


isAdmin: {type: Boolean, default: false}

});


UserSchema.pre('save', function(next) {


    const user = this

    bcrypt.hash(user.password, 10, (error, crypt)=>{

        user.password = crypt
        next()

    })

})



module.exports = mongoose.model('User', UserSchema);


