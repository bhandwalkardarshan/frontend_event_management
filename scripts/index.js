const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const formData = new FormData(loginForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Send a POST request using the fetch API
    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject), // Convert form data to JSON
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response data (e.g., display a success message or redirect)
            console.log(data);
            // Set the token in local storage
            localStorage.setItem('token', data.token);
            window.location.href="./html/admin-dashboard.html";
        })
        .catch((error) => {
            alert(error)
            console.error("Error:", error);
        });
        loginForm.reset()
});