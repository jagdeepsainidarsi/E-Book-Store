const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        quote_content:String,
        quote_by:String
    }
)
module.exports=mongoose.model("quote",schema);