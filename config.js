const mongoose=require('mongoose');

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
