const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        user_email:String,
        book_id:Number,
        book_name:String,
        book_pub:String,
        book_aut:String,
        book_img:String,
        seller_email:String,
        book_price:Number,
        quantity:Number
    }
)
module.exports=mongoose.model("cart",schema);