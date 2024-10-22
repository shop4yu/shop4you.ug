// Search Bar Functionality
const searchBar = document.querySelector('.search-bar-input');
const searchResults = document.querySelector('.search-result-box');

searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    // Fetch search results dynamically or filter the products based on the query
    searchResults.innerHTML = ''; // Clear previous results
    if (query.length > 0) {
        // Example product filter (you can replace with real API or DB logic)
        const products = ['Phone', 'Laptop', 'Headphones']; // Dummy product list
        const filtered = products.filter(item => item.toLowerCase().includes(query));
        
        if (filtered.length) {
            filtered.forEach(item => {
                searchResults.innerHTML += `<div>${item}</div>`;
            });
        } else {
            searchResults.innerHTML = `<div>No results found</div>`;
        }
    }
});

// Product Quick View Modal
const quickViewModal = document.querySelector('#quick-view-modal');
const quickViewButtons = document.querySelectorAll('.quick-view-btn');

quickViewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        // Fetch product data via AJAX call
        fetch(`/api/product/${productId}`)
            .then(response => response.json())
            .then(data => {
                // Update modal content dynamically
                quickViewModal.innerHTML = `
                    <div class="modal-body">
                        <h2>${data.name}</h2>
                        <img src="${data.image}" alt="${data.name}">
                        <p>${data.description}</p>
                        <strong>Price: $${data.price}</strong>
                    </div>
                `;
                $('#quick-view').modal('show'); // Show modal
            })
            .catch(err => console.error(err));
    });
});

// Wishlist Button Toggle
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const isActive = button.classList.contains('active');
        button.textContent = isActive ? 'Added to Wishlist' : 'Add to Wishlist';
        // Optionally send an AJAX request to update server
    });
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
        // Perform AJAX request to subscribe the email
        fetch('/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thank you for subscribing!');
            }
        })
        .catch(err => console.error(err));
    } else {
        alert('Please enter a valid email address.');
    }
});