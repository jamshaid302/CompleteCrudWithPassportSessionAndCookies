var express = require('express');
var router=express.Router();
var UserDal=require("../Dal/User");
const {check , validationResult} = require('express-validator');
const {matchedData} = require("express-validator");
const user = require("../Models/User");


router.get('/',function (req,res){
    res.render('signup');
});

router.post('/', function(req, res,done) {
        user.findOne({email : req.body.email},(err,newUser)=>{
            if(err){
                done(null,false);
            }
            else if(newUser){
                console.log('You Already Have an account');
                res.redirect('/signup');
            }else{
                UserDal.saveUser(req.body,function (data,err) {
                    res.redirect("/");
                });
            }
        })
    });

//to save data in db of users
// router.post("/",[
//     // check('fullname').trim(),
//     check('fullname').trim().custom((value,{ req }) => {
//         if(value === ""){
//             throw new Error('Name Field is Required');
//         }
//         else{
//             return true;
//         }
//     }),
//     check('email',"Invalid Email").trim().normalizeEmail().isEmail(),
//     check('password','Password Should be of length 5').trim().isLength({min : 5}),
//     check('cpassword').custom((value,{ req }) => {
//         if(value !== req.body.password){
//             throw new Error('Password Does Not Match');
//         }
//         else{
//             return true;
//         }
//     }),
// ],async(req,res)=>{
//     const error = validationResult(req);
//     if(!error.isEmpty()){
//         const data = matchedData(req);
//         return res.render('/signup',{errors:error.mapped(),data:data});
//     }
//     else{
//         UserDal.saveUser(req.body,function (data,err){
//             res.redirect("/");
//         })
//     }
// });


module.exports=router;