if(sessionStorage.getItem("adminLoggedIn") !== "true"){

window.location.href =
"sauxsecureportal2026.html";

}

let leads =
JSON.parse(
localStorage.getItem("enquiries")
) || [];

let container =
document.getElementById("leadsContainer");

function loadLeads(){

container.innerHTML = "";

if(leads.length === 0){

container.innerHTML = `

<tr>

<td colspan="9">

No Leads Found

</td>

</tr>

`;

}
else{

[...leads]
.reverse()
.forEach((lead,index)=>{

container.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${lead.date || "N/A"}</td>

<td>${lead.name || ""}</td>

<td>${lead.phone || ""}</td>

<td>${lead.email || ""}</td>

<td>${lead.message || ""}</td>

<td>

<select
onchange="updateStatus(${index},this.value)">

<option value="New"
${lead.status === "New" ? "selected" : ""}>

New

</option>

<option value="Pitched"
${lead.status === "Pitched" ? "selected" : ""}>

Pitched

</option>

<option value="Follow-Up"
${lead.status === "Follow-Up" ? "selected" : ""}>

Follow-Up

</option>

<option value="Converted"
${lead.status === "Converted" ? "selected" : ""}>

Converted

</option>

</select>

</td>

<td>

<select
onchange="assignExecutive(${index},this.value)">

<option value="">
Select
</option>

<option value="Vaibhav"
${lead.executive === "Vaibhav" ? "selected" : ""}>

Vaibhav

</option>

<option value="Supriya"
${lead.executive === "Supriya" ? "selected" : ""}>

Supriya

</option>

</select>

</td>

<td>

<button
class="share-btn"
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

let actualIndex =
leads.length - 1 - index;

leads[actualIndex].status = status;

localStorage.setItem(

"enquiries",

JSON.stringify(leads)

);

}

function assignExecutive(index,executive){

let actualIndex =
leads.length - 1 - index;

leads[actualIndex].executive =
executive;

localStorage.setItem(

"enquiries",

JSON.stringify(leads)

);

}

function shareLead(index){

let actualIndex =
leads.length - 1 - index;

let lead = leads[actualIndex];

let text = `

🔥 SAUX.IN New Lead

Name: ${lead.name}

Phone: ${lead.phone}

Email: ${lead.email}

Requirement: ${lead.message}

Status: ${lead.status || "New"}

Executive:
${lead.executive || "Not Assigned"}

`;

window.open(

`https://wa.me/919226494403?text=${encodeURIComponent(text)}`

);

}

function searchLead(){

let input =
document
.getElementById("searchLead")
.value
.toLowerCase();

let rows =
document.querySelectorAll("tbody tr");

rows.forEach((row)=>{

if(

row.innerText
.toLowerCase()
.includes(input)

){

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

let csvFile = new Blob(
[csv.join("\n")],
{
type:"text/csv"
}
);

let downloadLink =
document.createElement("a");

downloadLink.download =
"saux_leads.csv";

downloadLink.href =
window.URL.createObjectURL(csvFile);

downloadLink.style.display =
"none";

document.body.appendChild(
downloadLink
);

downloadLink.click();

}

function logout(){

sessionStorage.removeItem(
"adminLoggedIn"
);

window.location.href =
"sauxsecureportal2026.html";

}

loadLeads();

setInterval(function(){

leads =
JSON.parse(
localStorage.getItem("enquiries")
) || [];

loadLeads();

},3000);
