require('./models/db');
const express=require('express');
const usercrud=require('./controller/usercrud');
const path=require('path');
const exphand=require('express-handlebars');
const bodyparser=require('body-parser');

var app=express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphand({extname:'hbs', defaultLayout:'mainLayout', layoutsDir:__dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, ()=> {
    console.log('Express server started at port: 3000');
});

app.use('/user',usercrud);