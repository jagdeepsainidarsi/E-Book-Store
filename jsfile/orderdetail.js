var orderitemsInCart=document.getElementById("orderitemsInCart");
var loading=document.getElementById("loading");
var itemsInCart=document.getElementById("itemsInCart");
var noitem=document.getElementById("noitem");


function orderitems(){
    var req=new XMLHttpRequest();
    req.open("get","/logged");
    req.send();
    req.addEventListener("load",function()
    {
        var res=JSON.parse(req.responseText);
        var data=res.order_data;
        console.log(req.responseText,"136");
        console.log(data,"136");
        if(data.length==0)
        {
            noitem.style.display="block";
             loading.style.display="none";
        }
        else
        {
            for (var i = 0; i < data.length; i++) {
            orderdata(data, i);
            }
        }
    })
}
    
   function orderdata(data,i){
    loading.style.display="none";
    var div=document.createElement("div");
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
    var buynow=document.createElement("button");
    div.classList.add("left_container");
    datadiv.classList.add("datadiv");
    buynow.classList.add("buynow");
    span1.classList.add("bookname");
    span2.classList.add("authorname");
    span3.classList.add("publisher");
    span4.classList.add("price");
    span5.classList.add("avilable");
    span6.classList.add("stock");
    buttondiv1.classList.add("buttondiv1");
    orderitemsInCart.appendChild(div);
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
    buttondiv1.appendChild(buynow);
    buynow.id=data[i].book_id;
    buynow.innerHTML='Cancel Order';
    span1.innerHTML=data[i].book_name;
    span2.innerHTML=data[i].book_aut;
    span3.innerHTML='<i class="fa fa-tags" aria-hidden="true"></i>'+data[i].book_pub;
    span4.innerHTML='<i class="fa">&#xf156;</i>'+data[i].book_price;
    span5.innerHTML="Available At: "+data[i].book_seller_id;
    var res1 = data[i].status.substring(0, 9);
    if(res1=="Delivered"){
        buynow.disabled=true;
        buynow.innerHTML="Delivered";
        buynow.style.background="Green";
    }
    if(data[i].status=="Cancel"){
    buynow.disabled=true;
    buynow.innerHTML="Cancelled";
    span6.classList.remove("stock");
    span6.classList.add("red1");
    span6.innerHTML="Status: "+data[i].status;
    }
    else
    {
    // span6.classList.add("red1");
    span6.innerHTML="Status: "+data[i].status;
    }
    
buynow.addEventListener("click",function(event){
    loading.style.display="block";
    buynow.innerHTML="Cancelled";
    buynow.disabled=true;
    var detail={
        order_id:data[i].order_id,
        status:"Cancel",
    }
    console.log(detail,"93");
    var req=new XMLHttpRequest();
    req.open("post","/cancelorder");
    req.send(JSON.stringify(detail));
    req.addEventListener("load",function(){
        location.href="/orderdetail";
        loading.style.display="none";

    })
    })
   }

var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
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

orderitems();  

