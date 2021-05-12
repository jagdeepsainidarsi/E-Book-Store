const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        seller_name:String,
        seller_email:String,
        shop_name:String,
        shop_address:String,
        seller_number:Number,
        seller_pass:String,
        seller_comision:Number,
        
    }
)
module.exports=mongoose.model("seller",schema);