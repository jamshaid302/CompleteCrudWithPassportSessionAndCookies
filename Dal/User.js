var user=require("../Models/User");
var conn=require("../utility/conn");
const mongoose = require("mongoose");

var UserDal={
    getAllUsers:function (callback){
        user.find().then(function (data){
            callback(data);
        }).catch(function (err){
            callback(err.message);
        })
    },
    deleteUser:function (data,callback){
        user.findOneAndRemove({_id : data}).then(function (deleteIdData){
            callback(deleteIdData);
        }).catch(function (err){
            callback(err.message);
        })
    },
    updateUserData:function (data,callback){
        user.findById({_id : data}).then(function (updateIdData){
            callback(updateIdData);
        }).catch(function (err){
            callback(err.message);
        })
    },
    logIn:function (data,callback){
        user.findOne({email:data.username , password : data.password}).then(function (data){
            callback(data);
        }).catch(function (err){
            callback(err.message);
        })
    },
    saveUser:function (data,callback){
        var obj=new user({
            fullname : data.fullname,
            email    : data.email,
            password : data.password,
        });
        obj.save().then(function (data){
            console.log(data);
            callback(data);
        }).catch(function (err){
            callback(err.message);
        });
    },
    updateUser:function (data,callback){
        user.findOneAndUpdate({_id : data.id,},{$set:{fullname:data.fullname,email:data.email,password:data.password}},
            function (err,user){
                if(err){
                    console.log("Data Not Update");
                }else{
                    console.log('Data Updated Successfully');
                    console.log(data);
                    callback(data);
                }
            });
    },
}

module.exports=UserDal;