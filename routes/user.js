const express=require('express');
const path=require('path');
const fs=require('fs');
const route=express.Router();

route.use('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../', 'views', 'login.html'));
    console.log("login");

});
route.post('/savechat', (req, res, next) => {
    console.log(req.body);
    let msg = req.body.username + ":" + req.body.message;
    console.log(msg);
    fs.appendFileSync("message.txt", msg + '\n');
    res.redirect('/');
});
module.exports=route;