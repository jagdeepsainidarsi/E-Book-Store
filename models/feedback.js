const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        name:String,
        email:String,
        message:String
    }
)
module.exports=mongoose.model("feedback",schema);