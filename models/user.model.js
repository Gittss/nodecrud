const mongoose= require('mongoose');

var userSchema = new mongoose.Schema({
    name: {type:String, required:'Field required'},
    mobile: {type:String, minlength:10}
});

mongoose.model('User', userSchema);
