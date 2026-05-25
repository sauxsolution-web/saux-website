document
.getElementById("enquiryForm")
.addEventListener("submit", function(e){

e.preventDefault();

let enquiry = {

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

phone:
document.getElementById("phone").value,

message:
document.getElementById("message").value,

date:
new Date().toLocaleString(),

status:"New",

executive:""

};

let enquiries =
JSON.parse(
localStorage.getItem("enquiries")
) || [];

enquiries.push(enquiry);

localStorage.setItem(
"enquiries",
JSON.stringify(enquiries)
);

alert("Enquiry Submitted Successfully");

document
.getElementById("enquiryForm")
.reset();

});
