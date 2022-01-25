var express=require("express");
var router=express.Router();
var UserDal=require("../Dal/User");
var bodyParser = require('body-parser');
var urlEncoderParser = bodyParser.urlencoded({extended : true});
var userModel = require('../Models/User');

router.get("/",isAuthenticated,function (req,res,next){
    //res.send( req.user.fullname);
    if(req.user){
        res.render("viewAllUsers",{data : req.user.fullname});
    }
    else{
        res.redirect('/');
    }
});
function isAuthenticated(req,res,next){
    if(req.user){
        return next();
    }
    return res.redirect('/');
}
router.get('/getUsers', async (req , res , next )=>{
    try {
        console.log('req.query.start -> ',req.query['start']);    //skip
        console.log('req.query.length -> ',req.query['length']); //limit
        // this code to count total length
        let dt_total_length ;
        let dt_search_value;
        userModel.count( {}, function(err, result){
            if(err){
                res.send(err)
            }
            else{
                dt_total_length = result ;
            }
        });
        console.log('search[value]' , req.query.search['value']);
        dt_search_value = req.query.search['value'];
        if (dt_search_value != "") {
            await userModel.find({$or:[
                    {fullname : RegExp(dt_search_value,"i"),},
                    {email: RegExp(dt_search_value, "i")}
                ]})
                .limit(parseInt( req.query['length'])).skip(parseInt(  req.query['start']))
                .then(function (ninja){
                    console.log("Filtered Users"+ninja);
                    var oj=JSON.stringify(ninja);
                    var hh=JSON.parse(oj)
                    var obj= {
                        "recordsTotal": ninja.length,
                        "recordsFiltered": ninja.length,
                        "data": hh
                    }
                    res.status(200).json(obj)
                })
        } else {
            await userModel.find().limit(parseInt( req.query['length'])).skip(parseInt(req.query['start'])).then(function (ninja){
                var arr=[];
                var oj=JSON.stringify(ninja);
                var hh=JSON.parse(oj);
                var obj= {
                    "recordsTotal": dt_total_length,
                    "recordsFiltered": dt_total_length,
                    "data": hh
                }
                res.status(200).json(obj)
            })
        }
        // res.send(users);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports=router;