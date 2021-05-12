const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        seller_email:String,
        total_order:Number,
        total_price:Number,
        commision_percentage:Number,
        profit:Number,
        month:Number,
        year:Number,
        payment_status:String,
    }
)
module.exports=mongoose.model("profit",schema);