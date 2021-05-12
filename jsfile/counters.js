var visits_count_box_h1=document.getElementById("visits_count_box_h1");
var books_count_box_h1=document.getElementById("books_count_box_h1");
var users_count_box_h1=document.getElementById("users_count_box_h1");
var sellers_count_box_h1=document.getElementById("sellers_count_box_h1");
var req=new XMLHttpRequest();

req.open("get",'/count')
req.send();
req.addEventListener("load",function()
{
    var count=JSON.parse(req.responseText);
    console.log(count)
    var v=0,b=0,u=0,s=0;
   var intervalid= setInterval(function()
    {
        if(b<count.bookcount)
        {
            books_count_box_h1.innerHTML=b;
            b=b+1;
            if(b==count.bookcount)
            books_count_box_h1.innerHTML=b+"+";
        }
        if(u<count.usercount)
        {
            users_count_box_h1.innerHTML=u;
            u=u+1;
            if(u==count.usercount)users_count_box_h1.innerHTML=u+"+";
        }
        if(s<count.sellercount)
        {
            sellers_count_box_h1.innerHTML=s;
            s=s+1;
            if(s==count.sellercount)sellers_count_box_h1.innerHTML=s+"+";
        }
        if(v<=count.visitcount)
        {
            visits_count_box_h1.innerHTML=v;
            v=v+1
            if(v==count.visitcount)
            {
            clearInterval(intervalid); 
            visits_count_box_h1.innerHTML=v+"+";
            } 
        }
    },100);
})
