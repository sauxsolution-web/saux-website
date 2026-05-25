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

emailjs.send(

"YOUR_SERVICE_ID",

"template_5bm6g8i",

{

name: enquiry.name,

email: enquiry.email,

phone: enquiry.phone,

message: enquiry.message,

date: enquiry.date

},

"D_mM71rKR_GZPhnG7"

)

.then(function(response){

alert(
"Enquiry Submitted Successfully"
);

console.log(
"SUCCESS!",
response.status,
response.text
);

document
.getElementById("enquiryForm")
.reset();

})
.catch(function(error){

alert(
"Failed To Send Enquiry"
);

console.log(
"FAILED...",
error
);

});

});
