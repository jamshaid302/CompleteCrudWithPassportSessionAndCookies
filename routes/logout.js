var express = require('express');
var router=express.Router();

//log out
router.get("/", (req, res) => {
    req.logout();
    //res.send("Logged Out");
    console.log("log out");
    res.redirect("/");
});

module.exports=router;