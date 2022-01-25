var express = require('express');
var router=express.Router();
var UserDal=require("../Dal/User");
var user = require('../Models/User');
const passport = require("passport");
const LocalStrategy = require('passport-local');
const {check , validationResult} = require('express-validator');
const {matchedData} = require("express-validator");

passport.use(new LocalStrategy({
        username: 'username',
        password: 'password'
    },
    function(username, password, done) {
        user.findOne({ email: username,password:password }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'User not found.' });
            }
            if (!user.password) { return done(null, false, {
                message: 'Invalid password.' });
            }
            //console.log(user);
            return done(null, user);
        });
    }
));

passport.serializeUser((user, cb) => {
    if(user){
        return cb(null,user._id);
    }
    return cb(null, false);
});
passport.deserializeUser((id, cb) => {
    user.findById(id, (err, userData) => {
        if (err) {
            return cb(null, false);
        }
        //console.log(userData);
        return cb(null, userData);
    })
});

router.get('/',function (req,res){
    res.render('login');
});

router.post('/login', passport.authenticate('local'),
    function(req, res) {
        if(req.user){
            console.log('Login Successfully.....!!!');
            res.redirect('/viewAllUsers');
        }else{
            console.log("Invalid User");
            res.redirect('/');
        }
    });


// router.post('/login',passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login"
// }),function (req,res){
//     var session;
//     var email = req.body.username;
//     var pass  = req.body.password;
//     user.findOne({email : email,password : pass}).then (function (data,err){
//         session = req.session;
//         if(data){
//             session.userId = data._id;
//             console.log(req.session);
//             res.redirect('/viewAllUsers');
//         }else{
//             res.redirect('/');
//         }
//     });

    // UserDal.logIn(req.body,function (data,err){
    //     if(data){
    //         res.redirect('/viewAllUsers');
    //     }
    //     else{
    //         res.redirect('/');
    //     }
    // });
//});

module.exports=router;