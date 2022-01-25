var mongoose=require("mongoose");

let OrderSchema = new mongoose.Schema({
    fullname   : String,
    email   : String,
    password : String,
});

module.exports = mongoose.model("user",OrderSchema);