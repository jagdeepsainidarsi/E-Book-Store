const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        admin_id:String,
        admin_name:String,
        admin_pass:String,
        admin_phone:Number
    }
)
module.exports=mongoose.model("books",schema);