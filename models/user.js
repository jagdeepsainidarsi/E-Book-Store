const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        user_name:String,
        user_email:String,
        user_number:Number,
        user_pass:String
    }
)
module.exports=mongoose.model("user",schema);