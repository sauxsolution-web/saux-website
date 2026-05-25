if(sessionStorage.getItem("adminLoggedIn") !== "true"){

window.location.href =
"sauxsecureportal2026.html";

}
if(sessionStorage.getItem("adminLoggedIn") !== "true"){

window.location.href = "login.html";

}

let leads = JSON.parse(localStorage.getItem("enquiries")) || [];

let container = document.getElementById("leadsContainer");

function loadLeads(){

container.innerHTML = "";

if(leads.length === 0){

container.innerHTML = `

<tr>

<td colspan="10">
No Leads Found
</td>

</tr>

`;

}
else{

leads.reverse().forEach((lead,index)=>{

container.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${lead.date || "N/A"}</td>

<td>${lead.name}</td>

<td>${lead.phone}</td>

<td>${lead.email}</td>

<td>${lead.message}</td>

<td>

<select onchange="updateStatus(${index},this.value)">

<option ${lead.status === "New" ? "selected" : ""}>
New
</option>

<option ${lead.status === "Pitched" ? "selected" : ""}>
Pitched
</option>

<option ${lead.status === "Follow-Up" ? "selected" : ""}>
Follow-Up
</option>

<option ${lead.status === "Converted" ? "selected" : ""}>
Converted
</option>

</select>

</td>

<td>

<select onchange="assignExecutive(${index},this.value)">

<option value="">Select</option>

<option ${lead.executive === "Vaibhav" ? "selected" : ""}>
Vaibhav
</option>

<option ${lead.executive === "Supriya" ? "selected" : ""}>
Supriya
</option>

</option>

</select>

</td>

<td>

<button class="share-btn"
onclick="shareLead(${index})">

Share

</button>

</td>

</tr>

`;

});

}

}

function updateStatus(index,status){

leads[index].status = status;

localStorage.setItem("enquiries",JSON.stringify(leads));

}

function assignExecutive(index,executive){

leads[index].executive = executive;

localStorage.setItem("enquiries",JSON.stringify(leads));

}

function shareLead(index){

let lead = leads[index];

let text = `

🔥 New Lead Assigned

Name: ${lead.name}

Phone: ${lead.phone}

Email: ${lead.email}

Requirement: ${lead.message}

Status: ${lead.status || "New"}

`;

window.open(

`https://wa.me/?text=${encodeURIComponent(text)}`

);

}

function searchLead(){

let input =
document.getElementById("searchLead")
.value.toLowerCase();

let rows =
document.querySelectorAll("tbody tr");

rows.forEach((row)=>{

if(row.innerText.toLowerCase().includes(input)){

row.style.display = "";

}
else{

row.style.display = "none";

}

});

}

function exportCSV(){

let csv = [];

let headers = [

"No",
"Date",
"Name",
"Phone",
"Email",
"Requirement",
"Status",
"Executive"

];

csv.push(headers.join(","));

leads.forEach((lead,index)=>{

let row = [

index + 1,
lead.date || "",
lead.name || "",
lead.phone || "",
lead.email || "",
lead.message || "",
lead.status || "New",
lead.executive || ""

];

csv.push(row.join(","));

});

let csvFile = new Blob([csv.join("\n")],{
type:"text/csv"
});

let downloadLink =
document.createElement("a");

downloadLink.download = "saux_leads.csv";

downloadLink.href =
window.URL.createObjectURL(csvFile);

downloadLink.style.display = "none";

document.body.appendChild(downloadLink);

downloadLink.click();

}

function logout(){

sessionStorage.removeItem("adminLoggedIn");

window.location.href = "login.html";

}

loadLeads();

function logout(){

sessionStorage.removeItem(
"adminLoggedIn"
);

window.location.href =
"sauxsecureportal2026.html";

}
