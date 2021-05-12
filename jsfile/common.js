var user_form=document.getElementById("user_form");
var seller_form=document.getElementById("seller_form");
var user_radio=document.getElementById("user_radio");
var seller_radio=document.getElementById("seller_radio");
var loading=document.getElementById("loading");
var itemsInCart=document.getElementById("itemsInCart");
var noitem=document.getElementById("noitem");
seller_form.style.display="none";
user_form.style.display="block";
var loggedIn=false;
user_radio.addEventListener("change",function()
{
    seller_form.style.display="none";
    user_form.style.display="block";
})
seller_radio.addEventListener("change",function()
{
    seller_form.style.display="block";
    user_form.style.display="none";
})


var logout_button=document.getElementById("logout_button");
var no_cart_item_div=document.getElementById("no_cart_item");
var login_header=document.getElementById("login");
var register_header=document.getElementById("register");
var no_cart_item_label=document.getElementById("no_cart_items");
function is_login()
{
    var req=new XMLHttpRequest();
    req.open("get","/logged");
    req.send()
    req.addEventListener("load",function()
    {
        var res=JSON.parse(req.responseText);
        console.log(res);
        if(res.is_login===true)
        {
            loggedIn=true;
            login_header.style.display="none";
            register_header.style.display="none";
            no_cart_item_div.style.display="inline";
            logout_button.style.display="inline";

            no_cart_item_label.innerHTML=res.cart_data.length;
            // if(res.cart_data.length==0)
            // {
            //   noitem.style.display="block";
            //  loading.style.display="none";
            // }else{

            // var data=res.cart_data;
            //  console.log(data,"47");
            // for(var i=0;i<data.length;i++)
            // {
            //     console.log(data,"45");
            //     cartdata(data,i);
            // }
            // }
        }
        else{
            //  noitem.style.display="block";
            //  loading.style.display="none";
            loggedIn=false;}
    })
}
is_login();

// function cartdata(data,i){
    
//         loading.style.display="none";
//     var div=document.createElement("div");
//     var imgdiv=document.createElement("div");
//     var datadiv=document.createElement("div");
//     var ul=document.createElement("ul");
//     var li1=document.createElement("li");
//     var li2=document.createElement("li");
//     var li3=document.createElement("li");
//     var li4=document.createElement("li");
//     var li5=document.createElement("li");
//     var li6=document.createElement("li");
//     var span1=document.createElement("span");
//     var span2=document.createElement("span");
//     var span3=document.createElement("span");
//     var span4=document.createElement("span");
//     var span5=document.createElement("span");
//     var span6=document.createElement("span");
//     var buttondiv1=document.createElement("div");
//     var quantityupdate=document.createElement("input");
//     quantityupdate.setAttribute("type","number");
//     quantityupdate.classList.add("quantityupdate");
//     var update=document.createElement("button");
//     var deletebook=document.createElement("button");
//     var img=document.createElement("img");
//     div.classList.add("left_container");
//     imgdiv.classList.add("imgdiv");
//     datadiv.classList.add("datadiv");
//     update.classList.add("buynow");
//     span1.classList.add("bookname");
//     span2.classList.add("authorname");
//     span3.classList.add("publisher");
//     span4.classList.add("price");
//     span5.classList.add("avilable");
//     span6.classList.add("stock");
//     buttondiv1.classList.add("buttondiv1");
//     deletebook.classList.add("addtocart");
//     itemsInCart.appendChild(div);
//     div.appendChild(imgdiv);
//     imgdiv.appendChild(img);
//     div.appendChild(datadiv);
//     datadiv.appendChild(ul);
//     ul.appendChild(li1);
//     ul.appendChild(li2);
//     ul.appendChild(li3);
//     ul.appendChild(li4);
//     ul.appendChild(li5);
//     ul.appendChild(li6);
//     li1.appendChild(span1);
//     li2.appendChild(span2);
//     li3.appendChild(span3);
//     li4.appendChild(span4);
//     li5.appendChild(span6);
//     li6.appendChild(span5);
//     datadiv.appendChild(buttondiv1);
//     buttondiv1.appendChild(quantityupdate)
//     buttondiv1.appendChild(update);
//     buttondiv1.appendChild(deletebook);
//     update.id=data[i].book_id;
//     deletebook.id=data[i].book_id;
//     update.innerHTML='Update';
//     deletebook.innerHTML='Delete';
//     quantityupdate.value=data[i].quantity;
//     span1.innerHTML=data[i].book_name;
//     span2.innerHTML=data[i].book_aut+" (Author)";
//     span3.innerHTML='<i class="fa fa-tags" aria-hidden="true"></i>'+data[i].book_pub+" (Publisher)";
//     span4.innerHTML='<i class="fa">&#xf156;</i>'+data[i].book_price;
//     span6.innerHTML="In Stock";
//     span5.innerHTML="Available At: "+data[i].seller_email;
//     img.src=data[i].book_img;
//     }