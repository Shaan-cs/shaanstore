console.log("Navbar script loaded...");

fetch("../Navbar_Pages/navbar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        return response.text();
    })
    .then(data => {
        console.log("Navbar fetched successfully!");
        document.getElementById("navbarContainer").innerHTML = data;

        setupNavbar();   // ✅ Setup Navbar Functionality
        updateCartCount(); // ✅ Immediately Update Cart Count

        // ✅ Ensure Cart Count Updates When Product is Added
        document.addEventListener("cartUpdated", updateCartCount);
    })
    .catch(error => console.error("Error loading navbar:", error));

function setupNavbar() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userName = localStorage.getItem("userName");

    let signIn = document.getElementById("signIn");
    let cartIcon = document.getElementById("cartIcon");
    let userProfile = document.getElementById("userProfile");
    let profileImg = document.getElementById("profileImg");
    let profileDropdown = document.getElementById("profileDropdown");

    if (isLoggedIn === "true") {
        if (signIn) signIn.style.display = "none"; 
        if (cartIcon) cartIcon.style.display = "inline-block"; 
        if (userProfile) userProfile.style.display = "inline-block"; 
        document.getElementById("userName").innerText = userName;
    } else {
        if (signIn) signIn.style.display = "inline-block"; 
        if (cartIcon) cartIcon.style.display = "none"; 
        if (userProfile) userProfile.style.display = "none"; 
    }

    document.addEventListener("click", function (event) {
        if (!profileDropdown) {
            profileDropdown = document.getElementById("profileDropdown"); 
        }

        if (!profileImg) {
            profileImg = document.getElementById("profileImg"); 
        }

        if (profileImg && profileDropdown) {
            if (event.target === profileImg) {
                event.stopPropagation(); 
                profileDropdown.classList.toggle("show"); 
            } else if (!profileDropdown.contains(event.target)) {
                profileDropdown.classList.remove("show"); 
            }
        }
    });

    let logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            window.location.href = "../Main page/Index.html";

        });
    }
}


function updateCartCount() {
    console.log("🔄 Updating cart count...");

    let cart = JSON.parse(localStorage.getItem("cart")) || []; // 🛒 Get Cart from Local Storage
    let cartCountElement = document.getElementById("cartCount");

    if (cartCountElement) {
        console.log("✅ Cart count element found! Updating count:", cart.length);
        cartCountElement.innerText = cart.length; // 🛒 Show Cart Count
        cartCountElement.style.display = cart.length > 0 ? "inline-block" : "none"; // 🔥 Hide if empty
    } else {
        console.log("❌ Cart count element NOT found! Check navbar HTML.");
    }
}

// ✅ Ensure Cart Count Updates on Page Load
document.addEventListener("DOMContentLoaded", updateCartCount);
document.addEventListener("cartUpdated", updateCartCount); // ✅ Listen for Cart Updates
