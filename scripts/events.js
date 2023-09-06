let baseUrl = `https://backendeventmanagement-production.up.railway.app`

// Get references to the select elements
const categorySelect = document.getElementById("category-filter");
const priceSelect = document.getElementById("price-sort");

fetchData()

function fetchData(){
    // to get events data
fetch(`${baseUrl}/events`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data)
    showDataInCards(data)
});
}

// Add event listener for category filtering
categorySelect.addEventListener("change", function () {
    const selectedCategory = categorySelect.value;
    if(selectedCategory==""){
        fetchData()
    }
    else{
        fetch(`${baseUrl}/events?category=${selectedCategory}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showDataInCards(data)
        });
    }
});

// Add event listener for price sorting
priceSelect.addEventListener("change", function () {
    const selectedPrice = priceSelect.value;
    fetch(`${baseUrl}/events?_sort=price&_order=${selectedPrice}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showDataInCards(data)
    });
});

// Function to create event cards
function showDataInCards(events) {
    const cardContainer = document.getElementById("card-container"); 
    cardContainer.innerHTML = null;
    events.forEach((event, index) => {
        // Create a card element
        const card = document.createElement("div");
        card.classList.add("card"); // You can define card styles in your CSS

        // Populate card content
        card.innerHTML = `
            <img src="${event.poster}" alt="${event.name}" class="card-image">
            <div class="card-details">
                <h2 class="card-title">${event.name}</h2>
                <p class="card-description">${event.description}</p>
                <p class="card-date">Date: ${event.date}</p>
                <p class="card-location">Location: ${event.location}</p>
                <p class="card-category">Category: ${event.category}</p>
                <p class="card-price">Price: ${event.price}</p>
            </div>
        `;

        // Append the card to the card container
        cardContainer.appendChild(card);
    });
}

