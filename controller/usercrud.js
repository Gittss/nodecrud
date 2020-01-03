const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');

router.use(express.json());

router.get('/',(req,res) => {
    res.render("user/addEdit",{
        viewTitle: "Add User"
    });
});

router.post('/',(req,res) => {
    if(req.body._id == '')
      addUser(req,res);
    else editUser(req,res);
});

function addUser(req,res){
    var user=new User();
    user.name=req.body.name;
    user.mobile=req.body.mobile;
    user.save((err,doc) => {
        if(!err) res.redirect('user/list');
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("user/addEdit", {
                    viewTitle:"Add User",
                    user: req.body
                })
            }
            else console.log('Error in adding user '+err);
        }
    });
}

function editUser(req,res){
    User.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc) => {
        if(!err) res.redirect('/user/list');
        else {
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("user/addEdit", {
                    viewTitle:'Edit User',
                    user:req.body
                });
            }
            else console.log('Error updating user : '+err);
        }
    });
}

router.get('/list',(req,res) => {
    User.find((err,docs) =>{
        if(!err){
            res.render('user/list',{list:docs});
        }
        else {
            console.log('Error in reading user : '+err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'name':
                body['nameError']=err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError']=err.errors[field].message;
                break;
            default: break;
        }
    }
}

router.get('/:id',(req,res) => {
    User.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render("user/addEdit",{
                viewTitle:'Edit User',
                user:doc
            })
        }
    });
});

router.get('/delete/:id',(req,res) => {
    User.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err)
          res.redirect('/user/list');
        else console.log('Error in deleting user : '+err);
    });
});
module.exports=router;