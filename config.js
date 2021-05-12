const mongoose=require('mongoose');
var connection_string="mongodb+srv://deepak:deepak@cluster0.t2cxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var options={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

module.exports=function()
{
    mongoose.connect(connection_string,options);
    var db=mongoose.connection;
    db.on("error",function(err)
    {
        console.log("error to create connection with database");
    });
    db.on("open",function()
    {
        console.log("Database Connect");
    });
}