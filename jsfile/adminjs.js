var alert_msg1=document.getElementById("alert_msg1");
var loading=document.getElementById("loading");
var adminlogout=document.getElementById("adminlogout");
var dashboard_menu=document.getElementById("dashboard_menu");
var seller_menu=document.getElementById("seller_menu");
var book_menu=document.getElementById("book_menu");
var user_menu=document.getElementById("user_menu");
var user_table=document.getElementById("usertabledata");
var booktabledata=document.getElementById("booktabledata");
var ordertabledata=document.getElementById("ordertabledata")
var profittabledata=document.getElementById("profittabledata");
var feedbackTable=document.getElementById("feedbackTable");
var add_bookseller_menu=document.getElementById("add_bookseller_menu");
var order_menu=document.getElementById("order_menu");
var dashboard_home_content=document.getElementById("dashboard_home_content");
var profitdiv=document.getElementById("profitdiv");
var profit_menu=document.getElementById("profit_menu");
var dashboard_content=document.getElementById("dashboard_content");
var flex_box=document.getElementById("flex_box");
var feedback_content=document.getElementById("feedback_container");
var bookseller_section=document.getElementById("bookseller_section");
var user_section=document.getElementById("user_section");
var book_section=document.getElementById("book_section");
var order_section=document.getElementById("order_section");
var id02=document.getElementById("id02");
var admin_profile=document.getElementById("admin_profile");
var seller_search_box=document.getElementById("seller_search_box");

var seller_name=document.getElementById("seller_name");
var seller_email=document.getElementById("seller_email");
var seller_shop_name=document.getElementById("seller_shop_name");
var seller_shop_address=document.getElementById("seller_shop_address");
var seller_phone=document.getElementById("seller_phone");
var seller_comision=document.getElementById("seller_comision");
var seller_password=document.getElementById("seller_password");
var seller_add_button=document.getElementById("seller_add_button");
var table = document.getElementById("myTable");
var id021=document.getElementById("id021");
var seller_name_update=document.getElementById("seller_name_update");
var seller_email_update=document.getElementById("seller_email_update");
var seller_shop_name_update=document.getElementById("seller_shop_name_update");
var seller_shop_address_update=document.getElementById("seller_shop_address_update");
var seller_update_comision=document.getElementById("seller_update_comision");
var seller_phone_update=document.getElementById("seller_phone_update");
var seller_password_update=document.getElementById("seller_password_update");
var seller_add_button_update=document.getElementById("seller_update_button");


seller_add_button.addEventListener("click",function(){

    if(seller_name.value==""||seller_email.value==""||seller_shop_name.value==""||seller_shop_address.value==""||seller_phone.value==""||seller_password.value=="")
    {
    alert("All fields are mandatory");
}
else{
     var data={
        s_name:seller_name.value,
        s_email:seller_email.value,
        s_shop_name:seller_shop_name.value,
        s_shop_address:seller_shop_address.value,
        s_commision:seller_comision.value,
        s_phone:seller_phone.value,
        s_pass:seller_password.value
        }
        var req=new XMLHttpRequest();
        req.open("post","/addseller");
        req.send(JSON.stringify(data));
        req.addEventListener("load",function()
        {
            if(req.responseText=="true")
            {
              alert_msg1.style.display="block";
              alert_msg1.classList.add("green");
              alert_msg1.innerHTML="Seller Added Successfully!!!";
              window.setTimeout(function() {
              $(".alert1").slideUp(500, function(){});
              }, 2000);
            }
            else
            {
                alert_msg1.style.display="block";
                alert_msg1.classList.add("red");
                alert_msg1.innerHTML="Already Exist!!!";
                window.setTimeout(function() {
                $(".alert1").slideUp(500, function(){});
                }, 2000);
            }
        })
        seller_name.value="";
        seller_email.value="";
        seller_shop_name.value="";
        seller_shop_address.value="";
        seller_comision.value="";
        seller_phone.value="";
        seller_password.value="";
    }
})

function deleteRow(r) {
    // console.log(r,"130");
  var i = r.parentNode.parentNode.rowIndex;
//   console.log(i,"132");
  table.deleteRow(i);
}


dashboard_menu.addEventListener("click",function()
{
    profitdiv.style.display="none";
    myTable.style.display="none";
    bookseller_section.style.display="none";
    dashboard_home_content.style.display="block";
    user_section.style.display="none";
    order_section.style.display="none";
    id02.style.display="none";
    admin_profile.style.display="none";
    book_section.style.display="none";
})

//.............................SELLER DATA...........................
seller_menu.addEventListener("click",function(event)
{
    var rowCount = myTable.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            myTable.deleteRow(i);
        }
    loading.style.display="block";
    myTable.style.display="inline-table";
    bookseller_section.style.display="block";
    dashboard_home_content.style.display="none";
    user_section.style.display="none";
    profitdiv.style.display="none";
    order_section.style.display="none";
    id02.style.display="none";
    admin_profile.style.display="none";
    book_section.style.display="none";
    var req=new XMLHttpRequest();
    req.open("get","/getseller");
    req.send();
    req.addEventListener("load",function()
    {
        var data=JSON.parse(req.responseText);
        // console.log(data,"136");
        for (var i = 0; i < data.length; i++) {
            sellerdata(data, i);
        }
        loading.style.display="none";
    })
})

function sellerdata(data,i){
    
    var edit=document.createElement("button");
    // var update=document.createElement("button");
    var delete1=document.createElement("input");
    delete1.setAttribute("type", "button");
    delete1.setAttribute("value", "delete");
    delete1.setAttribute("onclick", "deleteRow(this)");
    edit.classList.add("user_table_edit_button");
    delete1.classList.add("user_table_delete_button");
    edit.innerHTML="Edit";
    delete1.innerHTML="Delete";
    var row = table.insertRow();
    row.id=data[i].seller_email;
    // update.id=data[i].seller_email;
    edit.id=data[i].seller_email;
    delete1.id=data[i].seller_email;
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    var cell8 = row.insertCell(8);
    cell0.innerHTML =data[i].seller_name;
    cell1.innerHTML = data[i].seller_email;
    cell2.innerHTML = data[i].shop_name;
    cell3.innerHTML = data[i].shop_address;
    cell4.innerHTML = data[i].seller_comision;
    cell5.innerHTML = data[i].seller_number;
    cell6.innerHTML = data[i].seller_pass;
    cell7.appendChild(edit);
    cell8.appendChild(delete1);
    edit.addEventListener('click', function (event){
        id021.style.display="block";
            if(this.id==data[i].seller_email){
            seller_add_button_update.id=data[i].seller_email;
            seller_name_update.value=cell0.innerHTML; 
            seller_email_update.value=cell1.innerHTML;
            seller_shop_name_update.value=cell2.innerHTML;
            seller_shop_address_update.value=cell3.innerHTML;
            seller_update_comision.value=cell4.innerHTML;
            seller_phone_update.value=cell5.innerHTML;
            seller_password_update.value=cell6.innerHTML;
            }
    })
    delete1.addEventListener("click",function(){
        if(this.id==data[i].seller_email)
        {
        var req=new XMLHttpRequest();
        req.open("post","/deleteseller");
        // console.log(data[i],"333");
        req.send(JSON.stringify({id:this.id}));
        req.addEventListener("load",function()
        {
            if(req.responseText=="true")
            {
              alert_msg1.style.display="block";
              alert_msg1.classList.add("green");
              alert_msg1.innerHTML="Seller Deleted Successfully!!!";
              window.setTimeout(function() {
              $(".alert1").slideUp(500, function(){});
              }, 2000);
            }
        })
        }
    })
    seller_add_button_update.addEventListener("click",function(){
    if(this.id==data[i].seller_email){
        cell0.innerHTML=seller_name_update.value; 
        cell1.innerHTML=seller_email_update.value;
        cell2.innerHTML=seller_shop_name_update.value;
        cell3.innerHTML=seller_shop_address_update.value;
        cell4.innerHTML=seller_update_comision.value;
        cell5.innerHTML=seller_phone_update.value;
        cell6.innerHTML=seller_password_update.value;
        var updatedate={
            seller_name:seller_name_update.value,
            seller_email:seller_email_update.value,
            shop_name:seller_shop_name_update.value,
            shop_address:seller_shop_address_update.value,
            seller_comision:seller_update_comision.value,
            seller_number:seller_phone_update.value,
            seller_pass:seller_password_update.value

        }
        var req=new XMLHttpRequest();
        req.open("post","/updateaddseller");
        console.log(updatedate);
        req.send(JSON.stringify(updatedate));
        req.addEventListener("load",function()
        {
            if(req.responseText=="true")
            {
              alert_msg1.style.display="block";
              alert_msg1.classList.add("green");
              alert_msg1.innerHTML="Seller Data Updated Successfully!!!";
              window.setTimeout(function() {
              $(".alert1").slideUp(500, function(){});
              }, 2000);
            }
        })
    }
    id021.style.display="none";
  })
};

// ................................SELLER DATA END........................


// .............................User Data.................................
var tbody=document.createElement("tbody");     
user_menu.addEventListener("click",function()
{
    loading.style.display="block";
    user_table.innerHTML="";
    tbody.innerHTML="";
    var thead=document.createElement("thead");
    
    user_table.appendChild(thead);
    user_table.appendChild(tbody);
    var th1=document.createElement("th");
    var th2=document.createElement("th");
    var th3=document.createElement("th");
    var th4=document.createElement("th");
    var th5=document.createElement("th");
    var th6=document.createElement("th");
    th1.innerHTML="UserEmail";
    th2.innerHTML="UserName";
    th3.innerHTML="UserPassword";
    th4.innerHTML="PhoneNo."
    th5.innerHTML="Edit";
    th6.innerHTML="Delete";
    thead.appendChild(th1);
    thead.appendChild(th2); 
    thead.appendChild(th3);
    thead.appendChild(th4);
    thead.appendChild(th5);
    thead.appendChild(th6);
    myTable.style.display="none";
    bookseller_section.style.display="none";
    dashboard_home_content.style.display="none";
    user_section.style.display="block";
    id02.style.display="none";
    profitdiv.style.display="none";
    order_section.style.display="none";
    admin_profile.style.display="none";
    book_section.style.display="none";
    var req=new XMLHttpRequest();
    req.open("get","/getusers");
    req.send();
    req.addEventListener("load",function()
    {
        var data=JSON.parse(req.responseText);
        console.log(data,"158");
        for (var i = 0; i < data.length; i++) {
            usersdata(data, i);
        }
         loading.style.display="none";
    })
})
function usersdata(data,i){
    var useredit=document.createElement("button");
    // var update=document.createElement("button");
    var userdelete=document.createElement("input");
    useredit.classList.add("user_table_edit_button");
    userdelete.classList.add("user_table_delete_button");
    useredit.innerHTML="Edit";
    userdelete.setAttribute("type", "button");
    userdelete.setAttribute("value", "delete");
    // userdelete.setAttribute("onclick", "deleteRow(this)");
    userdelete.classList.add("user_table_delete_button");
    userdelete.innerHTML="Delete";
    //   row.id=data[i].seller_email;
    // update.id=data[i].seller_email;
    useredit.id=data[i].user_email;
    userdelete.id=data[i].user_email;
    var tr=document.createElement("tr");
    tr.id=data[i].user_email;
    tbody.appendChild(tr);
    var th11=document.createElement("td");
    var th21=document.createElement("td");
    var th31=document.createElement("td");
    var th41=document.createElement("td");
    var th51=document.createElement("td");
    var th61=document.createElement("td");
    th11.innerHTML=data[i].user_email;
    th21.innerHTML=data[i].user_name;
    th31.innerHTML=data[i].user_pass;
    th41.innerHTML=data[i].user_number;
    th51.appendChild(useredit);
    th61.appendChild(userdelete);

    // th11.innerHTML=data[i].user.email;
    // th11.innerHTML=data[i].user.email;
    tr.appendChild(th11);
    tr.appendChild(th21);
    tr.appendChild(th31);
    tr.appendChild(th41);
    tr.appendChild(th51);
    tr.appendChild(th61);
    userdelete.addEventListener("click",function(){
    if(this.id=data[i].user_email)
    {  
        var req=new XMLHttpRequest();
        req.open("post","/userdelete");
        // console.log(data[i],"333");
        req.send(JSON.stringify({id:this.id}));
        req.addEventListener("load",function()
        {
            if(req.responseText=="true")
            {
              alert_msg1.style.display="block";
              alert_msg1.classList.add("green");
              alert_msg1.innerHTML="User Deleted Successfully!!!";
              window.setTimeout(function() {
                $(".alert1").slideUp(500, function(){ 
                });
            }, 2000);}
        })
        tr.innerHTML="";
    }
})
}

// ..............................End of user data........................


////////////////////////...........ORDER DATA........./////////////////////////
order_menu.addEventListener("click",function()
{
    loading.style.display="block";
    ordertabledata.innerHTML="";
    tbody.innerHTML="";
    var thead=document.createElement("thead");
    ordertabledata.appendChild(thead);
    ordertabledata.appendChild(tbody);
    var th1=document.createElement("th");
    var th2=document.createElement("th");
    var th3=document.createElement("th");
    var th4=document.createElement("th");
    var th5=document.createElement("th");
    var th6=document.createElement("th");
    var th7=document.createElement("th");
    // var th8=document.createElement("th");
    th1.innerHTML="OrderID";
    th2.innerHTML="BookID";
    th3.innerHTML="UserID";
    th4.innerHTML="UserAddress";
    th5.innerHTML="PhoneNo.";
    th6.innerHTML="SellerID";
    th7.innerHTML="Status";
    // th8.innerHTML="Delete";
    thead.appendChild(th1);
    thead.appendChild(th2); 
    thead.appendChild(th3);
    thead.appendChild(th4);
    thead.appendChild(th5);
    thead.appendChild(th6);
    thead.appendChild(th7);
    myTable.style.display="none";
    bookseller_section.style.display="none";
    dashboard_home_content.style.display="none";
    user_section.style.display="none";
    profitdiv.style.display="none";
    order_section.style.display="block";
    id02.style.display="none";
    admin_profile.style.display="none";
    book_section.style.display="none";
    var req=new XMLHttpRequest();
    req.open("get","/getorder");
    req.send();
    req.addEventListener("load",function()
    {
        var data=JSON.parse(req.responseText);
        console.log(data,"158");
        for (var i = 0; i < data.length; i++) {
            orderdata(data, i);
        }
         loading.style.display="none";
    })
   
});
function orderdata(data,i){
    var useredit=document.createElement("button");
    // var update=document.createElement("button");
    var bookdelete=document.createElement("input");
    useredit.classList.add("user_table_edit_button");
    bookdelete.classList.add("user_table_delete_button");
    useredit.innerHTML="Edit";
    bookdelete.setAttribute("type", "button");
    bookdelete.setAttribute("value", "delete");
    // userdelete.setAttribute("onclick", "deleteRow(this)");
    bookdelete.classList.add("user_table_delete_button");
    bookdelete.innerHTML="Delete";
    //   row.id=data[i].seller_email;
    // update.id=data[i].seller_email;
    useredit.id=data[i].book_id;
    bookdelete.id=data[i].book_id;
    var tr=document.createElement("tr");
    tr.id=data[i].book_id;
    tbody.appendChild(tr);
    var th10=document.createElement("td");
    var th11=document.createElement("td");
    var th21=document.createElement("td");
    var th31=document.createElement("td");
    var th41=document.createElement("td");
    var th51=document.createElement("td");
    var th61=document.createElement("td");
    th10.innerHTML=data[i].order_id;
    th11.innerHTML=data[i].book_id;
    th21.innerHTML=data[i].user_id;
    th31.innerHTML=data[i].user_address;
    th41.innerHTML=data[i].user_phone;
    th51.innerHTML=data[i].book_seller_id;
    //  const re = new RegExp(letter, 'Process');
    var res1 = data[i].status.substring(0, 7);
    console.log(res1);
    // matching the pattern
    // const count = str.match(re).length;
    if(data[i].status=="Cancel")
    {
    th61.style.background="red";
    th61.innerHTML=data[i].status;
    }
    else if(res1=="Process"){
    th61.style.background="green";
    th61.innerHTML=data[i].status;
    }
    else if(res1=="Deliver"){
    th61.style.background="blue";
    th61.innerHTML=data[i].status;
    }
    else{
    th61.innerHTML=data[i].status;
    }
    // th51.appendChild(useredit);
    // th61.appendChild(bookdelete);

    // th11.innerHTML=data[i].user.email;
    // th11.innerHTML=data[i].user.email;
    tr.appendChild(th10);
    tr.appendChild(th11);
    tr.appendChild(th21);
    tr.appendChild(th31);
    tr.appendChild(th41);
    tr.appendChild(th51);
    tr.appendChild(th61);
}

//..............................END OF ORDER DATA.......................

// ..................................Book Menu.........................
book_menu.addEventListener("click",function()
{
    loading.style.display="block";
    booktabledata.innerHTML="";
    tbody.innerHTML="";
    var thead=document.createElement("thead");
    
    booktabledata.appendChild(thead);
    booktabledata.appendChild(tbody);
    var th1=document.createElement("th");
    var th2=document.createElement("th");
    var th3=document.createElement("th");
    var th4=document.createElement("th");
    var th5=document.createElement("th");
    var th6=document.createElement("th");
    var th7=document.createElement("th");
    th1.innerHTML="BookId";
    th2.innerHTML="BookName";
    th3.innerHTML="AuthorName";
    th4.innerHTML="PublisherName";
    th5.innerHTML="Price"
    th6.innerHTML="Edit";
    th7.innerHTML="Delete";
    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3); 
    thead.appendChild(th4);
    thead.appendChild(th5);
    thead.appendChild(th6);
    thead.appendChild(th7);
    myTable.style.display="none";
    bookseller_section.style.display="none";
    dashboard_home_content.style.display="none";
    user_section.style.display="none";
    profitdiv.style.display="none";
    id02.style.display="none";
    order_section.style.display="none";
    admin_profile.style.display="none";
    book_section.style.display="block";
    var req=new XMLHttpRequest();
    req.open("get","/getbooks");
    req.send();
    req.addEventListener("load",function()
    {
        var data=JSON.parse(req.responseText);
        console.log(data,"343");
        for (var i = 0; i < data.length; i++) {
            bookdata(data, i);
        }
        window.setTimeout(function() {
         loading.style.display="none";
                
                }, 2000);
    })
    
});
function bookdata(data,i){
    var useredit=document.createElement("button");
    // var update=document.createElement("button");
    var bookdelete=document.createElement("input");
    useredit.classList.add("user_table_edit_button");
    bookdelete.classList.add("user_table_delete_button");
    useredit.innerHTML="Edit";
    bookdelete.setAttribute("type", "button");
    bookdelete.setAttribute("value", "delete");
    // userdelete.setAttribute("onclick", "deleteRow(this)");
    bookdelete.classList.add("user_table_delete_button");
    bookdelete.innerHTML="Delete";
    //   row.id=data[i].seller_email;
    // update.id=data[i].seller_email;
    useredit.id=data[i].book_id;
    bookdelete.id=data[i].book_id;
    var tr=document.createElement("tr");
    tr.id=data[i].book_id;
    tbody.appendChild(tr);
    var th10=document.createElement("td");
    var th11=document.createElement("td");
    var th21=document.createElement("td");
    var th31=document.createElement("td");
    var th41=document.createElement("td");
    var th51=document.createElement("td");
    var th61=document.createElement("td");
    th10.innerHTML=data[i].book_id;
    th11.innerHTML=data[i].book_name;
    th21.innerHTML=data[i].book_aut;
    th31.innerHTML=data[i].book_pub;
    th41.innerHTML=data[i].book_price;
    th51.appendChild(useredit);
    th61.appendChild(bookdelete);

    // th11.innerHTML=data[i].user.email;
    // th11.innerHTML=data[i].user.email;
    tr.appendChild(th10);
    tr.appendChild(th11);
    tr.appendChild(th21);
    tr.appendChild(th31);
    tr.appendChild(th41);
    tr.appendChild(th51);
    tr.appendChild(th61);
    bookdelete.addEventListener("click",function(){
    if(this.id=data[i].book_id)
    {  
        var req=new XMLHttpRequest();
        req.open("post","/booksdelete");
        // console.log(data[i],"333");
        req.send(JSON.stringify({id:this.id}));
        req.addEventListener("load",function()
        {
            if(req.responseText=="true")
            {
              alert_msg1.style.display="block";
              alert_msg1.classList.add("green");
              alert_msg1.innerHTML="Book Deleted Successfully!!!";
              window.setTimeout(function() {
                $(".alert1").slideUp(500, function(){ 
                });
                }, 2000);
            }
        })
        tr.innerHTML="";
    }
})
}

// ............................End of Book Menu........................


add_bookseller_menu.addEventListener("click",function()
{
    profitdiv.style.display="none";
    myTable.style.display="none";
    bookseller_section.style.display="none";
    dashboard_home_content.style.display="none";
    user_section.style.display="none";
    order_section.style.display="none";
    id02.style.display="block";
    admin_profile.style.display="none";
    book_section.style.display="none";
});

profit_menu.addEventListener("click",function()
{
    loading.style.display="block";
    profittabledata.innerHTML="";
    tbody.innerHTML="";
    var thead=document.createElement("thead");
    profittabledata.appendChild(thead);
    profittabledata.appendChild(tbody);
    var th1=document.createElement("th");
    var th2=document.createElement("th");
    var th3=document.createElement("th");
    var th4=document.createElement("th");
    var th5=document.createElement("th");
    var th6=document.createElement("th");
    var th7=document.createElement("th");
    var th8=document.createElement("th");
    // var th8=document.createElement("th");
    th1.innerHTML="Seller ID";
    th2.innerHTML="Total Order";
    th3.innerHTML="Total Price";
    th4.innerHTML="Commision (%)";
    th5.innerHTML="Profit";
    th6.innerHTML="status";
    th7.innerHTML="Edit";
    th8.innerHTML="Month,Year";
    // th8.innerHTML="Delete";
    thead.appendChild(th1);
    thead.appendChild(th8);
    thead.appendChild(th2); 
    thead.appendChild(th3);
    thead.appendChild(th4);
    thead.appendChild(th5);
    thead.appendChild(th6);
    thead.appendChild(th7);
    profitdiv.style.display="block";
    myTable.style.display="none";
    bookseller_section.style.display="none";
    dashboard_home_content.style.display="none";
    user_section.style.display="none";
    order_section.style.display="none";
    id02.style.display="none";
    admin_profile.style.display="none";
    book_section.style.display="none";
    var req=new XMLHttpRequest();
    req.open("get","/allprofitdata");
    req.send();
    req.addEventListener("load",function()
    {
        var allprofitdata=JSON.parse(req.responseText);
        console.log(allprofitdata,"663");
          for (var i = 0; i < allprofitdata.length; i++) {
            profitdata(allprofitdata, i);
        }
        loading.style.display="none";
});
})
function profitdata(allprofitdata,i){
    var useredit=document.createElement("button");
   
    var bookdelete=document.createElement("input");
    useredit.classList.add("user_table_edit_button");
    useredit.innerHTML="Edit";
    useredit.id=allprofitdata[i].seller_email;
    var tr=document.createElement("tr");
    tr.id=allprofitdata[i].seller_email;
    tbody.appendChild(tr);
    var th10=document.createElement("td");
    var th11=document.createElement("td");
    var th21=document.createElement("td");
    var th31=document.createElement("td");
    var th41=document.createElement("td");
    var th51=document.createElement("td");
    var th61=document.createElement("td");
    var th71=document.createElement("td");
    th10.innerHTML=allprofitdata[i].seller_email;
    th11.innerHTML=allprofitdata[i].total_order;
    th21.innerHTML=allprofitdata[i].total_price;
    th31.innerHTML=allprofitdata[i].commision_percentage;
    th41.innerHTML=allprofitdata[i].profit;
    th71.innerHTML=allprofitdata[i].month+" / "+allprofitdata[i].year;
    if(allprofitdata[i].payment_status=="Pending")
    {
    th51.style.background="red";
    th51.innerHTML=allprofitdata[i].payment_status;
    }else{
    th51.style.background="green";
    th51.innerHTML=allprofitdata[i].payment_status;
    }
    th61.appendChild(useredit);
    tr.appendChild(th10);
    tr.appendChild(th71);
    tr.appendChild(th11);
    tr.appendChild(th21);
    tr.appendChild(th31);
    tr.appendChild(th41);
    tr.appendChild(th51);
    tr.appendChild(th61);

   useredit.addEventListener("click",function(event){
       if(confirm(this.id+"Proceed to pay")){
        var req=new XMLHttpRequest();
        loading.style.display="block";
        req.open("post","/paymentstatusupdate");
        req.send(JSON.stringify({seller_email:this.id,status:"Payment Done"}));
        req.addEventListener("load",function(){
            if(req.responseText=="true"){
              alert_msg1.style.display="block";
              alert_msg1.classList.add("green");
              alert_msg1.innerHTML="Payment Updated!!!";
              window.setTimeout(function() {
                $(".alert1").slideUp(500, function(){ 
        loading.style.display="none";
                });
                }, 2000);
                th51.style.background="green";
                th51.innerHTML="Payment Done";
            }
        })
        }
    })
}

// ............................Book seller search..................
    function mySearchFunction() {
        var input, filter, ul, li, item, i, txtValue,j=0;
        filter = seller_search_box.value.toUpperCase();
        li = myTable.getElementsByTagName("tr");
       console.log(li);
        for (i = 1; i < li.length; i++) 
        {
            item = li[i];
            txtValue = item.textContent || item.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            // result.style.display="none";
        }
         else
         {
            j++;
            li[i].style.display = "none";
            if(j===li.length)
            {
               
            // result.style.display="block";
            // result.innerHTML="Match Not Found";
            var row = table.insertRow(1);
            console.log("hello")
            // var cell4 = row.insertCell(0);
            tr.innerHTML="no record found";
            }
            
         }
        }
  }
// .........................................................................


$(window).scroll(function() {
    if ($(this).scrollTop() >= 20) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 300);
});


function userfeedback(){
  var req=new XMLHttpRequest();
    req.open("get","/getfeedback");
    req.send();
    req.addEventListener("load",function()
    {
        var fdata=JSON.parse(req.responseText);
        console.log(fdata,"377");
          for (var i = 0; i < fdata.length; i++) {
            feedbackdata(fdata, i);
        }
         loading.style.display="none";
    })}
    function feedbackdata(fdata,i){
        // alert(fdata);
        var row1 = feedbackTable.insertRow();
        row1.id=fdata[i].email;
        var cell0 = row1.insertCell(0);
        var cell1 = row1.insertCell(1);
        var cell2 = row1.insertCell(2);
         cell0.innerHTML =fdata[i].name;
    cell1.innerHTML = fdata[i].email;
    cell2.innerHTML = fdata[i].message;
      
    }
    userfeedback();




   
            const btn = document.querySelector('#selectbuttonmy');
            var month=document.getElementById("month");
            var year=document.getElementById("year");
            btn.onclick = (event) => {
            event.preventDefault();
            // show the selected index
            // alert(sb.selectedIndex)
            loading.style.display="block";
            profittabledata.innerHTML="";
    tbody.innerHTML="";
    var thead=document.createElement("thead");
    profittabledata.appendChild(thead);
    profittabledata.appendChild(tbody);
    var th1=document.createElement("th");
    var th2=document.createElement("th");
    var th3=document.createElement("th");
    var th4=document.createElement("th");
    var th5=document.createElement("th");
    var th6=document.createElement("th");
    var th7=document.createElement("th");
    var th8=document.createElement("th");
    // var th8=document.createElement("th");
    th1.innerHTML="Seller ID";
    th2.innerHTML="Total Order";
    th3.innerHTML="Total Price";
    th4.innerHTML="Commision (%)";
    th5.innerHTML="Profit";
    th6.innerHTML="status";
    th7.innerHTML="Edit";
    th8.innerHTML="Month,Year";
    // th8.innerHTML="Delete";
    thead.appendChild(th1);
    thead.appendChild(th8);
    thead.appendChild(th2); 
    thead.appendChild(th3);
    thead.appendChild(th4);
    thead.appendChild(th5);
    thead.appendChild(th6);
    thead.appendChild(th7);
             var data={
                    month:parseInt(month.options[month.selectedIndex].value),
                    year:parseInt(year.options[year.selectedIndex].value)
                }
                
                var req=new XMLHttpRequest();
                req.open("post","/getallprofit");
                req.send(JSON.stringify(data));
                req.addEventListener("load",function(){

                   var allprofitdata=JSON.parse(req.responseText); 
                   console.log(data,"853");
                   if(allprofitdata.length==0)
                   {
                        var tr=document.createElement("tr");
                        tbody.appendChild(tr);
                        tr.innerHTML="no record found";
                   }
                   else{

                    for (var i = 0; i < allprofitdata.length; i++) {
            profitdata(allprofitdata, i);
        }
                   }
                   loading.style.display="none";
                });
            };
           
