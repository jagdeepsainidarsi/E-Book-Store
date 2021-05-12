var loading=document.getElementById("loading");
var alert_msg1=document.getElementById("alert_msg1");
var itemsInCart=document.getElementById("itemsInCart");
var noitem=document.getElementById("noitem");
var modal=document.getElementById("containerbuy");
var span = document.getElementsByClassName("close")[0];
var firstname=document.getElementById("firstname");
var email=document.getElementById("email");
var address=document.getElementById("address");
var pincode=document.getElementById("pincode");
var mobileno=document.getElementById("mobileno");
var selleremail=document.getElementById("selleremail");
var shopname=document.getElementById("shopname");
var shopaddress=document.getElementById("shopaddress");
var shopmno=document.getElementById("shopmno");
var buybookname=document.getElementById("buybookname");
var buybookauthor=document.getElementById("buybookauthor");
var buybookpub=document.getElementById("buybookpub");
var buybookprice=document.getElementById("buybookprice");
var buyimage=document.getElementById("buyimage");
var subtotle=document.getElementById("subtotle");
var item=document.getElementById("item");
var loading=document.getElementById("loading");
var placeorderbutton=document.getElementById("placeorderbutton");

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd+ '/' + mm + '/' + yyyy;

function cartitems(){
    // if(loggedIn==false)
    //     {
    //         alert("please Login");
    //     }else
    //     {
var req=new XMLHttpRequest();
req.open("get","/logged");
req.send();
req.addEventListener("load",function()
    {
        var res=JSON.parse(req.responseText);
        var data=res.cart_data;
        // console.log(data,"136");
        if(data.length==0)
        {
            noitem.style.display="block";
             loading.style.display="none";
        }
        else
        {
            for (var i = 0; i < data.length; i++) {
            cartdata(data, i);
            }
        }
    })
}
    
   function cartdata(data,i){
    loading.style.display="none";
    var div=document.createElement("div");
    var imgdiv=document.createElement("div");
    var datadiv=document.createElement("div");
    var ul=document.createElement("ul");
    var li1=document.createElement("li");
    var li2=document.createElement("li");
    var li3=document.createElement("li");
    var li4=document.createElement("li");
    var li5=document.createElement("li");
    var li6=document.createElement("li");
    var span1=document.createElement("span");
    var span2=document.createElement("span");
    var span3=document.createElement("span");
    var span4=document.createElement("span");
    var span5=document.createElement("span");
    var span6=document.createElement("span");
    var buttondiv1=document.createElement("div");
    // var quantityupdate=document.createElement("input");
    // quantityupdate.setAttribute("type","number");
    // quantityupdate.classList.add("quantityupdate");
    var buynow=document.createElement("button");
    var deletebook=document.createElement("button");
    var img=document.createElement("img");
    div.classList.add("left_container");
    imgdiv.classList.add("imgdiv");
    datadiv.classList.add("datadiv");
    buynow.classList.add("buynow");
    span1.classList.add("bookname");
    span2.classList.add("authorname");
    span3.classList.add("publisher");
    span4.classList.add("price");
    span5.classList.add("avilable");
    span6.classList.add("stock");
    buttondiv1.classList.add("buttondiv1");
    deletebook.classList.add("addtocart");
    itemsInCart.appendChild(div);
    div.appendChild(imgdiv);
    imgdiv.appendChild(img);
    div.appendChild(datadiv);
    datadiv.appendChild(ul);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    li1.appendChild(span1);
    li2.appendChild(span2);
    li3.appendChild(span3);
    li4.appendChild(span4);
    li5.appendChild(span6);
    li6.appendChild(span5);
    datadiv.appendChild(buttondiv1);
    // buttondiv1.appendChild(quantityupdate)
    buttondiv1.appendChild(buynow);
    buttondiv1.appendChild(deletebook);
    buynow.id=data[i].book_id;
    deletebook.id=data[i].book_id;
    buynow.innerHTML='Buy Now';
    deletebook.innerHTML='Delete';
    // quantityupdate.value=data[i].quantity;
    span1.innerHTML=data[i].book_name;
    span2.innerHTML=data[i].book_aut+" (Author)";
    span3.innerHTML='<i class="fa fa-tags" aria-hidden="true"></i>'+data[i].book_pub+" (Publisher)";
    span4.innerHTML='<i class="fa">&#xf156;</i>'+data[i].book_price;
    span6.innerHTML="In Stock";
    span5.innerHTML="Available At: "+data[i].seller_email;
    img.src=data[i].book_img;


    // update.addEventListener("click",function(event){
    //     if(quantityupdate.value<1)
    //     {
    //         alert("not allowed");
    //     }
    //     else
    //     {
    //      data[i].quantity=JSON.parse(quantityupdate.value);
    //      var req=new XMLHttpRequest();
    //     req.open("post","/updatecartitems");
    //     req.send(JSON.stringify(data[i]));
    //     req.addEventListener("load",function(){

    //     })
    //      console.log(data[i],"109");
    //     }
    // })
    buynow.addEventListener("click",function(){
      if(loggedIn==false)
         {
          alert("please login");
         }
         else
         {
             loading.style.display="block";
            placeorderbutton.id=data[i].book_id;
            var req=new XMLHttpRequest();
            req.open("post","/buyuserdata");
            req.send(JSON.stringify({seller_email:data[i].seller_email}));
            req.addEventListener("load",function()
            {
                var data=JSON.parse(req.responseText);
                // console.log(data,"116");
                 var shop=data.seller_detail;
                console.log(shop,"190");
                // firstname.value=data.user.user_name;
                // email.value=data.user.user_email;
                shopname.value=shop[0].shop_name;
                shopaddress.value=shop[0].shop_address;
                shopmno.value=shop[0].seller_number;
                firstname.value=data.user.user_name;
                email.value=data.user.user_email;
                loading.style.display="none";
             })
         
             window.setTimeout(function() {
             $(".containerbuy").slideDown(300, function(){});
             }, 100);
      if(this.id==data[i].book_id)
      {
          
          selleremail.value=data[i].seller_email;
          buybookname.innerHTML=data[i].book_name;
          buyimage.src=data[i].book_img;
          buybookauthor.innerHTML=data[i].book_aut+" (Author)";
          buybookpub.innerHTML=data[i].book_pub+" (Publisher)";
          buybookprice.innerHTML=data[i].book_price;
          item.innerHTML=1;
          subtotle.innerHTML=1*data[i].book_price;
      }
      }
})
    deletebook.addEventListener("click",function(event){
        // console.log(data[i],"119");
        var req=new XMLHttpRequest();
        req.open("post","/deletecartitems");
        req.send(JSON.stringify(data[i]));
        itemsInCart.removeChild(div);
        req.addEventListener("load",function(){
        location.reload();
        })
        //  if(data.length==0)
        //  {
        //      console.log(data.length,"131");
        //      noitem.style.display="block";
        //  }
    })
    }

placeorderbutton.addEventListener("click",function(){
     if(pincode.value==""||address.value==""||mobileno.value==""){
        alert("provide all info.")
        // console.log(mobileno.value.length,"229");
        address.focus();
    }
    else if(isNaN(mobileno.value)){
        
            alert("please enter digits only");
            mobileno.focus();
        
    }
    else if(mobileno.value.length != 10){
        alert("invalid mobile number");
        mobileno.focus();
    }
    else{

    var data={
        book_id:this.id,
        book_name:buybookname.innerHTML,
        book_aut:buybookauthor.innerHTML,
        book_pub:buybookpub.innerHTML,
        book_price:buybookprice.innerHTML,
        user_id:email.value,
        user_address:address.value+"/"+pincode.value,
        user_phone:mobileno.value,
        book_seller_id:selleremail.value,
        new_date:today
    }
    // console.log(data,"178");
            loading.style.display="block";
            var req=new XMLHttpRequest();
            req.open("post","/placeorder");
            req.send(JSON.stringify(data));
            req.addEventListener("load",function()
            {
                if(req.responseText=="true")
                {
                    // loading.style.display="none";
                    alert_msg1.style.display="block";
                    alert_msg1.classList.add("green");
                    alert_msg1.innerHTML="Order Placed!!!";
                    window.setTimeout(function() {
                    $(".alert1").slideUp(400, function(){});
                   loading.style.display="none";
                    location.href="/cart";
                    }, 1000);
                    // alert("order placed");
                }
                else{
                //    alert("not placed");
                    alert_msg1.style.display="block";
                    alert_msg1.classList.add("red");
                    alert_msg1.innerHTML="Order Not Placed!!!";
                    window.setTimeout(function() {
                    $(".alert1").slideUp(400, function(){});
                    location.href="/cart";
                    loading.style.display="none";
                    }, 1000);
                //    location.href="/cart";
                }
            })
            }
})

    span.onclick = function() {
//   modal.style.display = "none";
   window.setTimeout(function() {
    $(".containerbuy").slideUp(500, function(){
        
    });
}, 100);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    window.setTimeout(function() {
    $(".containerbuy").slideUp(500, function(){
        
    });
}, 100);
  }
}
    

var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
   
    behavior: "smooth";
    $('html, body').animate({scrollTop:0}, '300');
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;


}


cartitems();    



