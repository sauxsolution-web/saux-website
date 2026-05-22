window.addEventListener("scroll", function () {

const header = document.querySelector("header");

if (window.scrollY > 50) {
    header.style.background = "#000814";
} else {
    header.style.background = "rgba(0,0,0,0.7)";
}

});

console.log("SAUX Website Loaded");
