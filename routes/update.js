var express = require('express');
var router=express.Router();
var UserDal=require("../Dal/User");
const {check, validationResult, matchedData} = require("express-validator");


router.get("/:id",function (req,res){
    var id=req.params.id;
    UserDal.updateUserData(id,function (data,err){
        res.render("update",{data:data});
    })
});

router.post("/:id", async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        const data = matchedData(req);
        return res.render('/update',{errors:error.mapped(),data:data});
    }
    else{
        req.body.id=req.params.id;
        UserDal.updateUser(req.body,function (data,err){
            res.redirect("/viewAllUsers");
        })
    }
});

module.exports=router;