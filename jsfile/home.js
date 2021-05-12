var quote_content=document.getElementById("quote_content");
var quote_by=document.getElementById("quote_by");
var req=new XMLHttpRequest();
req.open("GET","/getquote")
req.send();
req.addEventListener("load",function()
{
    var quote=JSON.parse(req.responseText);
    console.log(quote);
    var i=0;
    setInterval(function()
    {
        quote_content.innerHTML=quote[i].quote_content;
        quote_by.innerHTML=quote[i].quote_by;
        i=i+1;
        if(i==(quote.length))
        {
            i=0;
        }
    },7000)
})
