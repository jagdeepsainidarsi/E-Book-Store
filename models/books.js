const mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var schema=new mongoose.Schema(
    {
        book_id:Number,
        book_name:String,
        book_pub:String,
        book_aut:String,
        book_img:String,
        seller_email:String,
        book_price:Number
    }
)
// schema.plugin(autoIncrement.plugin, { model: 'books', field: 'book_id' });
module.exports=mongoose.model("books",schema);