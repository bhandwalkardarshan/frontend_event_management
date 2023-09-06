let baseUrl = `https://backendeventmanagement-production.up.railway.app`
const eventForm = document.getElementById("event-form");

 // Function to parse query parameters from the URL
 function getQueryParameter(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

// Retrieve the 'id' parameter from the URL
const id = getQueryParameter('id');

if (id !== null) {
    // You can use the 'id' value for further processing
    console.log(`ID from URL: ${id}`);
} else {
    console.error('ID parameter not found in the URL');
}


// to get events data
fetch(`${baseUrl}/events/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data)
    showDataInForm(data)
});

// Function to show the form with event data
function showDataInForm(event) {
    // Get references to the form fields
    const posterField = document.getElementById("poster");
    const nameField = document.getElementById("name");
    const descriptionField = document.getElementById("description");
    const dateField = document.getElementById("date");
    const locationField = document.getElementById("location");
    const categoryField = document.getElementById("category");
    const priceField = document.getElementById("price");

    // Populate the form fields with event data
    posterField.value = event.poster;
    nameField.value = event.name;
    descriptionField.value = event.description;
    dateField.value = event.date;
    locationField.value = event.location;
    categoryField.value = event.category;
    priceField.value = event.price;
}

// update event
eventForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const formData = new FormData(eventForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Send a POST request using the fetch API
    fetch(`${baseUrl}/events/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject), // Convert form data to JSON
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Event Updated Successfully")
            window.location.href = "admin-dashboard.html"
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        
      eventForm.reset()  
});