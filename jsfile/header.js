
const header = document.querySelector('.main-header');
var alert_msg=document.getElementById("alert_msg");
// var alert_msg2=document.getElementById("alert_msg2");

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 10 ) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }
});
setTimeout(function()
{
    alert_msg.style.display="none";
},2000);
// 
//  function validation(){
//          var a = document.forms["form"]["user_name"].value;
// 		 var b = document.forms["form"]["user_pass"].value;
// 		 var c= document.forms["form"]["user_email"].value;
// 		 var d= document.forms["form"]["user_phone"].value;
// 		//  var e = document.forms["form"]["password"].value;
// 		//  var f = document.forms["form"]["cpassword"].value;
//   if (a == ""||b == ""||c == ""||d=="") {
//      alert_msg1.style.display="block";
//     alert_msg1.innerHTML="All Field is mandatory";
//      setTimeout(function()
//             {
//               alert_msg1.style.display="none";
//             },1000);
//     return false;
//   }
//    else if(b.length<6){
//   alert_msg1.style.display="block";
//     alert_msg1.innerHTML="Password length must be 6 characters";
//      setTimeout(function()
//             {
//               alert_msg1.style.display="none";
//             },1000);
//   return false;
//   }else{alert("Data sent..")};
// }
//login js
// var login=document.getElementById("login");
// login.setAttribute("data-toggle","modal");
// login.setAttribute("data-target","#myModal");
// var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal1) {
//     modal1.style.display = "none";
//   }
// }
// register js

// var register=document.getElementById("register")


// register.setAttribute("data-toggle","modal");
// register.setAttribute("data-target","#myModal");
// var modal1 = document.getElementById('id02');
// window.onclick = function(event) {
//   if (event.target == modal2) {
//     modal2.style.display = "none";
//   }

$(window).scroll(function() {
    if ($(this).scrollTop() >= 700) {        // If page is scrolled more than 50px
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