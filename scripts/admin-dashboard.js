let baseUrl = `https://backendeventmanagement-production.up.railway.app`
const eventForm = document.getElementById("event-form");
const eventTable = document.getElementById("event-table");

fetchData();

eventForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const formData = new FormData(eventForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Send a POST request using the fetch API
    fetch(`${baseUrl}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject), // Convert form data to JSON
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("Event Added Successfully")
            fetchData();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        
      eventForm.reset()  
});

// Function to populate the table with data
function showTable(data) {
    const tbody = eventTable.querySelector("tbody");
    tbody.innerHTML = ""; // Clear existing data

    data.forEach((event) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.category}</td>
            <td>${event.price}</td>
            <td>
                <button onclick="editEvent(${event.id})">Edit</button>
                <button onclick="deleteEvent(${event.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Fetch data from your API 
function fetchData(){
    fetch(`${baseUrl}/events`)
    .then((response) => response.json())
    .then((data) => {
        showTable(data); 
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

// Function to handle edit button click
function editEvent(eventId) {
    window.location.href = `edit-event.html?id=${eventId}`;
    console.log(`Edit event with ID: ${eventId}`);
}

// Function to handle delete button click
function deleteEvent(eventId) {
    fetch(`${baseUrl}/events/${eventId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("Event Deleted Successfully")
            fetchData();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        
    console.log(`Delete event with ID: ${eventId}`);
}
