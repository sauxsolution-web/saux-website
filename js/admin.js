/* =========================================
   SAUX SOLUTION - ADMIN LEAD MANAGEMENT
========================================= */

/* ADMIN LOGIN PROTECTION */
if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "sauxsecureportal2026.html";
}


/* =========================================
   GET LEADS
========================================= */

function getLeads() {
    try {
        return JSON.parse(localStorage.getItem("enquiries")) || [];
    } catch (error) {
        console.error("Unable to read enquiries:", error);
        return [];
    }
}


/* =========================================
   SAVE LEADS
========================================= */

function saveLeads(leads) {
    localStorage.setItem("enquiries", JSON.stringify(leads));
}


/* =========================================
   LOAD LEADS
========================================= */

function loadLeads() {

    const leads = getLeads();

    const container = document.getElementById("leadsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (leads.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;padding:30px;">
                    No Leads Found
                </td>
            </tr>
        `;

        return;
    }


    /* NEWEST LEAD FIRST */

    const reversedLeads = [...leads].reverse();


    reversedLeads.forEach((lead, index) => {

        const actualIndex = leads.length - 1 - index;


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${escapeHTML(lead.date || "N/A")}</td>

            <td>${escapeHTML(lead.name || "")}</td>

            <td>
                <a href="tel:${escapeHTML(lead.phone || "")}">
                    ${escapeHTML(lead.phone || "")}
                </a>
            </td>

            <td>
                <a href="mailto:${escapeHTML(lead.email || "")}">
                    ${escapeHTML(lead.email || "")}
                </a>
            </td>

            <td>
                ${escapeHTML(lead.message || "")}
            </td>

            <td>

                <select onchange="updateStatus(${actualIndex}, this.value)">

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

                <select onchange="assignExecutive(${actualIndex}, this.value)">

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
                    onclick="shareLead(${actualIndex})">

                    Share

                </button>

            </td>

        `;


        container.appendChild(row);

    });

}


/* =========================================
   UPDATE STATUS
========================================= */

function updateStatus(index, status) {

    const leads = getLeads();

    if (!leads[index]) return;

    leads[index].status = status;

    saveLeads(leads);

    loadLeads();
}


/* =========================================
   ASSIGN EXECUTIVE
========================================= */

function assignExecutive(index, executive) {

    const leads = getLeads();

    if (!leads[index]) return;

    leads[index].executive = executive;

    saveLeads(leads);

    loadLeads();
}


/* =========================================
   SHARE LEAD
========================================= */

function shareLead(index) {

    const leads = getLeads();

    const lead = leads[index];

    if (!lead) return;


    const text = `SAUX SOLUTION - New Lead

Name: ${lead.name || "N/A"}

Phone: ${lead.phone || "N/A"}

Email: ${lead.email || "N/A"}

Business: ${lead.business || "N/A"}

Requirement: ${lead.message || "N/A"}

Status: ${lead.status || "New"}

Executive: ${lead.executive || "Not Assigned"}
`;


    /* MOBILE / SUPPORTED BROWSERS */

    if (navigator.share) {

        navigator.share({
            title: "SAUX SOLUTION - New Lead",
            text: text
        }).catch(() => {});

        return;
    }


    /* WHATSAPP FALLBACK */

    const whatsappURL =
        "https://wa.me/919226494403?text=" +
        encodeURIComponent(text);

    window.open(whatsappURL, "_blank");

}


/* =========================================
   SEARCH LEADS
========================================= */

function searchLead() {

    const input =
        document
            .getElementById("searchLead")
            .value
            .toLowerCase()
            .trim();


    const rows =
        document.querySelectorAll("#leadsContainer tr");


    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();


        row.style.display =
            text.includes(input) ? "" : "none";

    });

}


/* =========================================
   EXPORT CSV
========================================= */

function exportCSV() {

    const leads = getLeads();


    if (leads.length === 0) {

        alert("No leads available to export.");

        return;

    }


    const headers = [
        "No",
        "Date",
        "Name",
        "Phone",
        "Email",
        "Business",
        "Requirement",
        "Status",
        "Executive"
    ];


    const rows = [headers];


    leads.forEach((lead, index) => {

        rows.push([
            index + 1,
            lead.date || "",
            lead.name || "",
            lead.phone || "",
            lead.email || "",
            lead.business || "",
            lead.message || "",
            lead.status || "New",
            lead.executive || ""
        ]);

    });


    const csv = rows
        .map(row =>
            row
                .map(value =>
                    `"${String(value)
                        .replace(/"/g, '""')}"`
                )
                .join(",")
        )
        .join("\n");


    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "saux_solution_leads.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    sessionStorage.removeItem("adminLoggedIn");

    window.location.href =
        "sauxsecureportal2026.html";

}


/* =========================================
   SECURITY - HTML ESCAPE
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   AUTO REFRESH
========================================= */

loadLeads();


setInterval(() => {

    loadLeads();

}, 3000);


/* =========================================
   STORAGE EVENT
   Updates Admin When Another Tab Changes
========================================= */

window.addEventListener("storage", event => {

    if (event.key === "enquiries") {

        loadLeads();

    }

});
