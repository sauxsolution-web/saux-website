let leads = JSON.parse(localStorage.getItem("enquiries")) || [];

let container = document.getElementById("leadsContainer");

if(leads.length === 0){

container.innerHTML = "<p>No Leads Found</p>";

}
else{

leads.forEach((lead)=>{

container.innerHTML += `

<div class="lead-card">

<h3>${lead.name}</h3>

<p><strong>Email:</strong> ${lead.email}</p>

<p><strong>Phone:</strong> ${lead.phone}</p>

<p><strong>Message:</strong> ${lead.message}</p>

</div>

`;

});

}
