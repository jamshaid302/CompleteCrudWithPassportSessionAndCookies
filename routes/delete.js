var express = require('express');
var router=express.Router();
var UserDal=require("../Dal/User");

router.get("/:id",function (req,res){
    var id=req.params.id;
    UserDal.deleteUser(id,function (data,err){
        res.redirect("/viewAllUsers");
    })
});

module.exports=router;