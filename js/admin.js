if(sessionStorage.getItem("adminLoggedIn") !== "true"){

window.location.href = "login.html";

}

let leads = JSON.parse(localStorage.getItem("enquiries")) || [];

let container = document.getElementById("leadsContainer");

function loadLeads(){

container.innerHTML = "";

if(leads.length === 0){

container.innerHTML = `

<div class="lead-card">

<h3>No Leads Found</h3>

<p>No enquiry submissions available.</p>

</div>

`;

}
else{

leads.reverse().forEach((lead,index)=>{

container.innerHTML += `

<div class="lead-card">

<h3>${lead.name}</h3>

<p><strong>Email:</strong> ${lead.email}</p>

<p><strong>Phone:</strong> ${lead.phone}</p>

<p><strong>Message:</strong> ${lead.message}</p>

<button class="delete-btn" onclick="deleteLead(${index})">
Delete Lead
</button>

</div>

`;

});

}

}

function deleteLead(index){

let confirmDelete = confirm("Delete this lead?");

if(confirmDelete){

leads.splice(index,1);

localStorage.setItem("enquiries", JSON.stringify(leads));

loadLeads();

}

}

function logout(){

sessionStorage.removeItem("adminLoggedIn");

window.location.href = "login.html";

}

setTimeout(()=>{

sessionStorage.removeItem("adminLoggedIn");

window.location.href = "login.html";

},1800000);

loadLeads();
