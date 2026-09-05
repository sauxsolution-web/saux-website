/* =========================================
   SAUX SOLUTION - ENQUIRY SUBMISSION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enquiryForm");

    if (!form) {
        console.error("SAUX SOLUTION: enquiryForm not found.");
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        /* GET FORM VALUES */

        const name =
            document.getElementById("name")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const business =
            document.getElementById("business")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        /* VALIDATION */

        if (!name || !email || !phone || !message) {

            alert("Please fill all required fields.");

            return;
        }


        /* GET EXISTING ENQUIRIES */

        let enquiries = [];

        try {

            enquiries =
                JSON.parse(
                    localStorage.getItem("enquiries")
                ) || [];

        } catch (error) {

            console.error(
                "Error reading existing enquiries:",
                error
            );

            enquiries = [];

        }


        /* CREATE NEW LEAD */

        const lead = {

            id:
                "SAUX-" +
                Date.now(),

            date:
                new Date().toLocaleString("en-IN"),

            name:
                name,

            email:
                email,

            phone:
                phone,

            business:
                business,

            message:
                message,

            status:
                "New",

            executive:
                ""

        };


        /* ADD NEW LEAD */

        enquiries.push(lead);


        /* SAVE TO LOCAL STORAGE */

        try {

            localStorage.setItem(
                "enquiries",
                JSON.stringify(enquiries)
            );

        } catch (error) {

            console.error(
                "Unable to save enquiry:",
                error
            );

            alert(
                "Unable to save your enquiry. Please try again."
            );

            return;

        }


        /* VERIFY SAVE */

        const saved =
            JSON.parse(
                localStorage.getItem("enquiries")
            ) || [];


        console.log(
            "SAUX SOLUTION enquiry saved:",
            saved
        );


        /* SUCCESS MESSAGE */

        alert(
            "Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly."
        );


        /* CLEAR FORM */

        form.reset();

    });

});
