const express = require('express')
var fs=require("fs");
var path=require("path");
var session=require("express-session");
var bodyParser = require('body-parser')
const app = express();
const port = 3000;
//db connection
var config=require("./config.js")
config();
// model
var user_model=require("./models/user.js");
var seller_model=require("./models/seller_model.js")
var book_model=require("./models/books.js");
var order_model=require("./models/order.js");
var feedback_model=require("./models/feedback.js")
var visitor_model=require("./models/count.js");
var quote_model=require("./models/quote.js");
var cart_model=require("./models/cart.js");
var profit_model=require("./models/profit.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('view'));
app.use(express.static('img'));
app.use(express.static('upload'));
app.use(express.static('jsfile'));
app.set("view engine","ejs");

app.use(session({
    secret:"helo",
    resave:false,
    saveUninitialized:false,    
}))
var multer  = require('multer')
var storage = multer.diskStorage({
    destination:"upload1",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage,
})
app.post('/getallprofit',(req,res)=>
{
    console.log("req at /getallprofit")
    readJSONBody(req,function(task)
    {
        profit_model.find({month:task.month,year:task.year},function(err,data){

            if(err)
            {
                res.end("false");
            }
            else{
                res.send(data);
            }
        })
        // console.log(task,"51");
        
    })
})

app.get('/allprofitdata',(req,res)=>
{
    profit_model.find({ },function(err,data)
    {
        res.send(data);
    })
})

app.get('/', (req, res) => {
    // console.log(req.rawHeaders[23])
    // var quote=new cart_model({
    //     user_email:"deepaksainidarsi@gmail.com",
    //     book_id:1
    // })
    // quote.save(function(eer,data)
    // {
    //     console.log(data,eer);
    // })
    visitor_model.findOneAndUpdate({name: "counter"},{ $inc: { count: 1 }},function(err,counter)
    {
        //console.log(counter);
	    res.render('home',{title:"Home",login:""});
    });


})
app.get('/getquote',(req,res)=>
{
    quote_model.find({ },function(err,data)
    {
        res.send(JSON.stringify(data));
    })
})

app.get('/count',(req,res)=>
{
    visitor_model.find({ name:"counter" },function(err,visitcount)
    {
        book_model.find({ },function(err1,bookcount)
        {
            user_model.find({ },function(err2,usercount)
            {
                seller_model.find({ },function(err3,sellercount)
                {
                    var count=
                    {
                        visitcount:visitcount[0].count,
                        usercount:usercount.length,
                        sellercount:sellercount.length,
                        bookcount:bookcount.length
                    }
                    res.end(JSON.stringify(count))
                })
            })
        })
    })
})


app.get('/shop', (req, res) => {
	res.render('shop',{title:"Shop",login:""});
})

app.get('/orderdetail', (req, res) => {
	res.render('orderdetail',{title:"Cart",login:""});
})

app.get('/cart', (req, res) => {
    console.log("request at /cart");
    if(req.session.is_login==false)
    {
        res.render('home',{title:"Home",login:"cart_msg"});
    }
    else
    {
	    res.render('cart',{title:"Cart",login:""});
    }
})

app.get('/contactus', (req, res) => {
	res.render('contact',{title:"Contact Us",login:""});
})

app.get('/seller', (req, res) => {
	 res.sendFile(__dirname + '/view/seller.html');
})

app.post('/adminlogin', (req, res) => {
    console.log("request at /adminlogin");
    if(req.body.admin_email=="ebookstore@gmail.com" && req.body.admin_pass=="admin")
   {
    //  req.session.admin_login=true;
    // console.log(req.session.admin_login,"96");
	 res.sendFile(__dirname + '/view/admin.html');}
     else
     res.sendFile(__dirname + '/view/adminlogin.html');
});

app.get('/ebookstoreadmin',(req,res)=>
{
    res.sendFile(__dirname + '/view/adminlogin.html');
})

app.get("/logged",function(req,res)
{
    console.log("request at /logged");
    if(req.session.is_login==undefined) 
    {
        req.session.is_login=false;
    }
    console.log(req.session.is_login);
    if(req.session.is_login==false)      
        res.end(JSON.stringify({is_login:req.session.is_login}));
    else
    {
        if(req.session.user.user_email)
        {
            console.log("User cart")
             cart_model.find({ user_email:req.session.user.user_email },function(err,data)
            {
                order_model.find({user_id:req.session.user.user_email},function(err1,data1){

                res.end(JSON.stringify({is_login:req.session.is_login,user:req.session.user,cart_data:data,order_data:data1}));            
                })
            })       
        }
        else
        {
            res.end(JSON.stringify({is_login:req.session.is_login,user:req.session.user}));
        }

    }
    
});

app.post("/buyuserdata",function(req,res){
    readJSONBody(req,function(task){
    {
      console.log(req.session.is_login,"162");
      console.log({user:req.session.user},"163");
      seller_model.find({seller_email:task.seller_email},function(err,data){
       res.end(JSON.stringify({is_login:req.session.is_login,user:req.session.user,seller_detail:data})); 
        //   res.send()
      })
      
    }

    })
})


///////////////////////////////////CART////////////////////////////

app.post("/addtocart",function(req,res){
     readJSONBody(req,function(task){
         console.log(task,"188");
      cart_model.find({user_email:req.session.user.user_email,book_id:task.book_id},function(err,data){
         if(err)
        {
            console.log("error to find");
        }
        else
        {
            if(data.length==0)
            {

                var cart=new cart_model
                ({
                    // user_name:req.body.user_name,
                    user_email:req.session.user.user_email,
                    book_id:task.book_id,
                    book_name:task.book_name,
                    book_pub:task.book_pub,
                    book_aut:task.book_aut,
                    book_img:task.book_img,
                    seller_email:task.seller_email,
                    book_price:task.book_price,
                    quantity:1
                    // user_pass:req.body.user_pass
                })
                cart.save(function(err,person)
                {
                    console.log(err,person);
                    res.end("true");
                })
                console.log("user added");
                
            }
            else
            {
                console.log("Already Exist");
                res.end("false");
            }
        }
      })

     })

})



// app.get('/getcartitems',(req,res)=>
// {
//     console.log(req.session.is_login)
//         if(req.session.is_login==undefined) 
//     {
//         console.log(req.session.is_login,"226"),
//         req.session.is_login=false;
        
        
//     }
//     if(req.session.is_login==false)      
//         {
//             console.log("233")
//             // res.end(JSON.stringify({is_login:req.session.is_login}));
//         res.render('home',{title:"Home",login:""});
//         // res.end();
//         }
//     else
//     {
//         if(req.session.user.user_email)
//         {
//             console.log("User cart")
//             cart_model.find({user_email:req.session.user.user_email },function(err,data)
//             {
//                 res.send(JSON.stringify(data));          
//             })       
//         }
//         else
//         {
//             // res.end(JSON.stringify({is_login:req.session.is_login,user:req.session.user}));
            
//             res.end("false");
//         }

//     }
  
// })

// app.post('/updatecartitems',(req,res)=>
// {
//     readJSONBody(req,function(task){
//         console.log(task,"328")
//     cart_model.find({user_email:req.session.user.user_email,book_id:task.book_id },function(err,data)
//     {    
//         if(data.length==0)
//         {
//            res.end("false");
//         }
//         else
//         {
//             console.log(data,"95");
//             cart_model.updateOne(data[0], task, function(err, res1) {
//             if (err) {
//                 throw err;
//                 res.end("false");
//                 }
//             else{
//              console.log("1 document updated");
//               res.end("true");
//               }
// })
//         }
//     });
   
// })
// })

app.post('/deletecartitems',(req,res)=>
{
     readJSONBody(req,function(task){

    console.log(task,"117")
    cart_model.deleteOne({user_email:req.session.user.user_email,book_id:task.book_id },function(err,data)
    {    
        res.end("true");
    });

     })
   
})
///////////////////////////////CART END///////////////////////////

app.post('/loginuser',(req, res) => {
    console.log("request at /loginuser")
	user_model.find({user_email:req.body.user_email,user_pass:req.body.user_pass},function(err,data)
    {
        console.log("User",data);
        if(data.length==0)
        {
            res.render('home',{title:"Home",login:"false"});
            res.end();
        }
        else
        {
            req.session.is_login=true;
            req.session.user=data[0];
            res.render('shop',{title:"Shop",login:"true"});
            res.end("true");
        }
    });
});

//.........................................ADMIN SECTION..........................................
app.post('/addseller',(req,res)=>
{
    readJSONBody(req,function(task){

        console.log(task,"260");
        seller_model.find({seller_email:task.s_email},function(err,data){
            if(err)
            {
              console.log("error to find");
            } 
            else
            {
               if(data.length==0)
               {
                   var seller=new seller_model
                   ({
                    seller_name:task.s_name,
                    seller_email:task.s_email,
                    shop_name:task.s_shop_name,
                    shop_address:task.s_shop_address,
                    seller_comision:task.s_commision,
                    seller_number:task.s_phone,
                    seller_pass:task.s_pass
                
                   })
                   seller.save(function(err,person){
                    console.log(err,person);
                    res.end("true");
                   })
               
                }
                else
                   {
                       console.log("alreadt exist");
                       res.end("false");
                    }
            
            }
        })
    })
})

app.post('/updateaddseller',(req,res)=>
{
    readJSONBody(req,function(task){
        console.log(task,"328")
    seller_model.find({seller_email:task.seller_email },function(err,data)
    {    
        if(data.length==0)
        {
           res.end("false");
        }
        else
        {
            console.log(data,"280");
            seller_model.updateOne(data[0], task, function(err, res1) {
            if (err) {
                throw err;
                res.end("false");
                }
            else{
             console.log("1 document updated");
              res.end("true");
              }
})
        }
    });
   
})})

app.post('/deleteseller',(req,res)=>{
readJSONBody(req,function(task){
    
    console.log(task,"295");
    seller_model.deleteOne({seller_email:task.id},function(err,data){
    book_model.deleteMany({seller_email:task.id},function(e,d){
    order_model.deleteMany({book_seller_id:task.id},function(e1,d1){

    res.end("true");
    })   
        })

    })
})
})
//......................................END OF ADMIN SECTION......................................

app.post('/adduser',(req, res) => {
    console.log("request at /adduser")
    user_model.find({user_email:req.body.user_email},function(err,data)
    {
        if(err)
        {
            console.log("error to find");
        }
        else
        {
            if(data.length==0)
            {

                var user=new user_model
                ({
                    user_name:req.body.user_name,
                    user_email:req.body.user_email,
                    user_number:req.body.user_number,
                    user_pass:req.body.user_pass
                })
                user.save(function(err,person)
                {
                    console.log(err,person);
                    res.render('home',{title:"Home",login:"register"});
                })
                console.log("user added");
                
            }
            else
            {
                console.log("user not added");
                res.render('home',{title:"Home",login:"duplicate"});
            }
        }
    })
	
})

// .....................................SELLER DATA...........................

app.post('/loginseller',(req,res)=>
{
     console.log("request at /loginseller")
    seller_model.find({seller_email:req.body.user_email,seller_pass:req.body.user_pass},function(err,data)
    {
        // console.log("Book Seller",data)
        if(data.length==0)
        {
            res.render('home',{title:"Home",login:"false"});
            res.end();
                
        }
        else
        {
            req.session.is_login=true;
            req.session.user=data[0];
            res.render('seller',{login:""}); 
        }
    });
})

app.get('/getseller',(req,res)=>
{
    seller_model.find({ },function(err,data)
    {
        if(data.length==0)
        {
            res.end("false");
        }
        else
        {
            res.send(data);
        }
    });
})

app.get('/product',(req,res)=>
{
    console.log("request at /product",req.session.user.seller_email);
    book_model.find({ seller_email:req.session.user.seller_email },function(err,data)
    {
        if(data.length==0)
        {
            // console.log("no book found")
            res.end("false");
        }
        else
        {
            // console.log("book found"+data.length)
            res.send(data);
        }
    });
})

app.get('/getbooks',(req,res)=>
{
    book_model.find({ },function(err,data)
    {
        if(data.length==0)
        {
            res.end("false");
        }
        else
        {
            res.send(data);
        }
    });
})



app.post('/booksdelete',(req,res)=>{
readJSONBody(req,function(task){
    
    console.log(task,"333");
    book_model.deleteOne({book_id:task.id},function(err,data){
    res.render('seller',{login:" "}); 

    })
})
})

app.post('/updatebook',(req,res)=>
{
    readJSONBody(req,function(task)
    {
        book_model.find({book_id:task.book_id },function(err,data)
        {    
        if(data.length==0)
        {
           res.end("false");
        }
        else
        {
            book_model.updateOne(data[0], task, function(err, res1) 
            {
                if (err) 
                {
                    throw err;
                    res.end("false");
                }
                else
                {
                    console.log("Book Updated");
                    res.end("true");
                }
            })
        }
        });
    });
})

// ...........................................SELLER_DATA_END.......................................


//...............................ORDER......................................
app.post("/placeorder",function(req,res){
    readJSONBody(req,function(task){
     order_model.find({ },function(err,data)
    {
        var l=data.length-1;
        order_id=data[l].order_id;
        task.order_id=order_id+1;
        task.status="New";
        console.log(task,"180");
        var order=new order_model(task);
        order.save(function(err,person)
        {
            console.log(err,person);
            if(err)
            {
                res.end("false");
            }
            else
            {
                res.end("true");
            }
        })
        })
    })
})

app.post("/cancelorder",(req,res)=>{
    readJSONBody(req,function(task){
        console.log(task,"554");
        // order_model.find({order_id:task.order_id},function(err,data){
        //     console.log(data,"556");
        // })
        var new_info={
            status:task.status
        }
        order_model.updateOne({order_id:task.order_id},{ $set:{status:task.status}},function(err,data){
 console.log(data,"562");
 res.send("true");
        })
    })
})

app.post("/paymentstatusupdate",(req,res)=>{
    readJSONBody(req,function(task){
        console.log(task,"653");
        // order_model.find({order_id:task.order_id},function(err,data){
        //     console.log(data,"556");
        // })
        // var new_info={
        //     status:task.status
        // }
        profit_model.updateOne({seller_email:task.seller_email},{ $set:{payment_status:task.status}},function(err,data){
 console.log(data,"653");
 res.send("true");
        })
    })
})

//..............................ORDER END...................................

app.post('/userdelete',(req,res)=>{
readJSONBody(req,function(task){
    
    console.log(task,"310");
    user_model.deleteOne({user_email:task.id},function(err,data)
    {
        cart_model.deleteMany({user_email:task.id},function(e,d)
        {
            order_model.deleteMany({user_id:task.id},function(ee,dd)
            {
                res.end("true");
            })
        })
    })
})
})





app.get('/getusers',(req,res)=>
{
    user_model.find({ },function(err,data)
    {
        if(data.length==0)
        {
            res.end("false");
        }
        else
        {
            res.send(data);
        }
    });
})

app.get('/getbooks',(req,res)=>
{
    book_model.find({ },function(err,data)
    {
        if(data.length==0)
        {
            res.end("false");
        }
        else
        {
            res.send(data);
        }
    });
})

app.get('/getfeedback',(req,res)=>
{
    feedback_model.find({ },function(err,data)
    {
        if(data.length==0)
        {
         res.end("false");
        }
        else
        {
            res.send(data);
        }
    });
})

app.post('/addbook',upload.single("book_img"),(req,res)=>
{
    console.log(req.body,"462");
    console.log(req.file,"463");
    var book_id;
    book_model.find({ },function(err,data)
    {
        var l=data.length-1;
        book_id=data[l].book_id;
        var book=new book_model(
            {
            book_id:book_id+1,
            book_name:req.body.book_name,
            book_pub:req.body.book_pub,
            book_aut:req.body.book_aut,
            // book_img:req.file.path,
            book_img:req.file.filename,
            seller_email:req.session.user.seller_email,
            book_price:req.body.book_price
            })
        book.save(function(err,person)
        {
            console.log(err,person);
            if(err)
            {
                res.render('seller',{login:"nobookuploaded"});
            }
            else
            {
                res.render('seller',{login:"bookuploaded"});
            }
        })
    })
})

app.get('/order',(req,res)=>
{
    console.log("request at /order",req.session.user.seller_email);
    order_model.find({ book_seller_id:req.session.user.seller_email },function(err,data)
    {
        // console.log(data)
        if(data.length==0)
        {
            res.end("false");
        }
        else
        {
            res.send(data);
        }
    })
})

app.get('/getorder',(req,res)=>
{
    // console.log("request at /order",req.session.user.seller_email);
    order_model.find({ },function(err,data)
    {
        // console.log(data)
        if(data.length==0)
        {
            res.end("false");
        }
        else
        {
            res.send(data);
        }
    })
})

app.post('/orderstatus',(req,res)=>
{
    console.log("request at /orderstatus");
     readJSONBody(req,function(task)
     {
        order_model.find({ order_id:task.order_id},function(err,data)
        {
            if(data.length==0)
            {
                res.end("false");
            }
            else
            {
                var is_delivered=task.status.indexOf("Delivered");
                if(is_delivered!=-1)
                {
                    console.log("in is_deliverd if")
                    let start_index=task.status.indexOf("/")
                    let end_index=task.status.indexOf("/",start_index+1);
                    var delivered_month=task.status.substring(start_index+1,end_index);
                    delivered_month=parseInt(delivered_month);

                    let delivered_year=task.status.substring(end_index+1,task.status.length)
                        seller_model.find({seller_email:data[0].book_seller_id},function(eer,seller_detail)
                        {
                            
                            profit_model.find({seller_email:seller_detail[0].seller_email,month:delivered_month,year:delivered_year},function(eee,profit_detail)
                            {
                                if(profit_detail.length==0)
                                {
                                    var profit_date=new profit_model(
                                    {
                                        seller_email:data[0].book_seller_id,
                                        total_order:1,
                                        total_price:data[0].book_price,
                                        commision_percentage:seller_detail[0].seller_comision,
                                        profit:(data[0].book_price*seller_detail[0].seller_comision)/100,
                                        month:delivered_month,
                                        year:delivered_year,
                                        payment_status:"Pending"                                                          
                                    });                                   
                                    profit_date.save(function(e1,save_profit_data)
                                    {
                                        console.log(save_profit_data)
                                        order_model.updateOne(data[0], task, function(err1, res1) 
                                        {
                                            if(err1)
                                            {
                                                throw err1;
                                                res.end("false");
                                            }
                                            else
                                            {

                                                console.log("Order Status Updated");
                                                res.end("true");
                                            }
                                        })
                                    })
                                }
                                else
                                {
                                    var o=
                                    {
                                        // seller_email:data[0].book_seller_id,
                                        total_order:profit_detail[0].total_order+1,
                                        total_price:profit_detail[0].total_price+data[0].book_price,
                                        commision_percentage:seller_detail[0].seller_comision,
                                        profit:profit_detail[0].profit+(data[0].book_price*seller_detail[0].seller_comision)/100,
                                        // month:delivered_month,
                                        // year:delivered_year,
                                        // payment_status:"Pending"
                                    }
                                    profit_model.updateOne(profit_detail[0],o,function(profit_err,update_profit_detail)
                                    {
                                        console.log(update_profit_detail);
                                        order_model.updateOne(data[0], task, function(err1, res1) 
                                        {
                                            if(err1)
                                            {
                                                throw err1;
                                                res.end("false");
                                            }
                                            else
                                            {

                                                console.log("Order Status Updated");
                                                res.end("true");
                                            }
                                        })
                                    });
                                }
                            })
                        });                    
                }
                else
                {
                    order_model.updateOne(data[0], task, function(err1, res1) 
                    {
                        if(err1)
                        {
                            throw err1;
                            res.end("false");
                        }
                        else
                        {

                            console.log("Order Status Updated");
                            res.render('seller',{login:""}); 
                        }
                    })
                }
                
            }
        })  
     })
})

app.get('/logout',(req,res)=>
{
    console.log("request at /logoutseller");
    req.session.is_login=false;
    res.render('home',{title:"Home",login:""});
})

app.post('/feedback',(req,res)=>
{
    console.log("request at /feedback")
    var feedback=new feedback_model
    ({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    })
    feedback.save(function(err,data)
    {
        if(err)
        {
            console.log("enable to save feedback");
            res.render('contact',{title:"Contact Us",login:"noalert"});
        }
        else
        {
            console.log("feedback saved");
            res.render('contact',{title:"Contact Us",login:"alert"});
        }
    })
})

function readJSONBody(request, callback) 
{
  var body = '';
  request.on('data', function(chunk) {
					 body += chunk;
			}); 

  request.on('end', function() {
					var data = JSON.parse(body);
					callback(data);
                    console.log(body);
		   });

}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})


