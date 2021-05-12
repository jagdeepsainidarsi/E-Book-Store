const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        order_id:Number,
        book_id:Number,
        book_name:String,
        book_aut:String,
        book_pub:String,
        book_price:Number,
        new_date:String,
        user_id:String,
        user_address:String,
        user_phone:Number,
        book_seller_id:String,
        status:String,
    }
)
module.exports=mongoose.model("order",schema);