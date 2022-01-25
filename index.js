var express=require("express");
var app=express();
var bodyParser = require('body-parser');
var pass = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');


app.use("/assets",express.static("assets"));
app.set("view engine","ejs");
app.set("views",__dirname+"/views");
app.use(cookieParser());
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    rolling : true,
    resave: false
}));
app.use(pass.initialize());
app.use(pass.session());

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var login = require("./routes/login");
app.use('/',login);

var logout = require("./routes/logout");
app.use('/logout',logout);

var signup = require("./routes/signup");
app.use('/signup',signup);

//google pay
var googlePay = require("./routes/googlepay");
app.use('/googelpay',googlePay);

var viewAllUsers = require("./routes/viewAllUsers");
app.use('/viewAllUsers',viewAllUsers);

var deleteUser = require("./routes/delete");
app.use('/delete',deleteUser);

var update = require("./routes/update");
app.use('/update',update);

app.listen(3001,function (){
    console.log("listening at 3001")
})