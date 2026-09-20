/* =====================================================
   CIVICPULSE JAVASCRIPT
===================================================== */


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }

    window.scrollTo(0, 0);
}


/* =========================
   REGISTER
========================= */

document
    .getElementById("registerForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const mobile =
            document.getElementById("registerMobile").value.trim();

        const role =
            document.getElementById("registerRole").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("registerConfirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            return;
        }


        const user = {
            name: name,
            email: email,
            mobile: mobile,
            role: role,
            password: password
        };


        localStorage.setItem(
            "civicPulseUser",
            JSON.stringify(user)
        );


        message.style.color = "#217a3b";

        message.textContent =
            "Account created successfully!";


        setTimeout(function() {

            if (role === "admin") {
                showPage("adminLoginPage");
            } else {
                showPage("citizenLoginPage");
            }

        }, 800);

    });


/* =========================
   ADMIN LOGIN
========================= */

document
    .getElementById("adminLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("adminEmail").value.trim();

        const password =
            document.getElementById("adminPassword").value;


        const message =
            document.getElementById("adminMessage");


        const savedUser =
            JSON.parse(
                localStorage.getItem("civicPulseUser")
            );


        /*
           Demo admin login.

           This can later be replaced with:
           fetch("YOUR_BACKEND/admin/login")
        */

        if (
            savedUser &&
            savedUser.email === email &&
            savedUser.password === password &&
            savedUser.role === "admin"
        ) {

            localStorage.setItem(
                "loggedInRole",
                "admin"
            );

            localStorage.setItem(
                "loggedInName",
                savedUser.name
            );


            document.getElementById("adminName")
                .textContent = savedUser.name;


            showPage("adminDashboardPage");

        } else {

            message.textContent =
                "Invalid admin email or password.";

        }

    });


/* =========================
   CITIZEN LOGIN
========================= */

document
    .getElementById("citizenLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("citizenEmail").value.trim();

        const password =
            document.getElementById("citizenPassword").value;


        const message =
            document.getElementById("citizenMessage");


        const savedUser =
            JSON.parse(
                localStorage.getItem("civicPulseUser")
            );


        if (
            savedUser &&
            savedUser.email === email &&
            savedUser.password === password &&
            savedUser.role === "citizen"
        ) {

            localStorage.setItem(
                "loggedInRole",
                "citizen"
            );

            localStorage.setItem(
                "loggedInName",
                savedUser.name
            );


            document.getElementById("citizenName")
                .textContent = savedUser.name;


            showPage("citizenDashboardPage");

        } else {

            message.textContent =
                "Invalid citizen email or password.";

        }

    });


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem("loggedInRole");
    localStorage.removeItem("loggedInName");

    showPage("homePage");
}


/* =========================
   INITIAL PAGE
========================= */

document.addEventListener("DOMContentLoaded", function() {

    showPage("homePage");

});
