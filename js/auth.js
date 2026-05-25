const encodedUser = "c2F1eGFkbWlu";

const encodedPass = "c2F1eEAyMDI2";

function decode(value){

return atob(value);

}

document
.getElementById("loginBtn")
.addEventListener("click", function(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

if(

username === decode(encodedUser)

&&

password === decode(encodedPass)

){

sessionStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href = "admin.html";

}
else{

document.getElementById("error")
.innerHTML =
"Invalid Username or Password";

}

});
