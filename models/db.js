const mongoose= require('mongoose');
require('./user.model');

mongoose.connect('mongodb://localhost:27017/Userdb', {useNewUrlParser:true}, (err)=> {
    if(!err) console.log('MongoDB connection Succeded')
    else console.log('Error in MongoDB connection '+err)
});
