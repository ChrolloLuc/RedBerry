document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.listings-track');
    let cards = Array.from(track.querySelectorAll('.property-card'));
    const cardWidth = cards[0].offsetWidth + 20; 
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    let currentIndex = 0;
    const visibleCards = 4;

    
    function appendNextSet() {
        const clones = cards.slice(0, visibleCards).map(card => card.cloneNode(true));
        clones.forEach(clone => track.appendChild(clone));
        cards = Array.from(track.querySelectorAll('.property-card')); 
    }

    
    function prependPrevSet() {
        const clones = cards.slice(-visibleCards).map(card => card.cloneNode(true));
        clones.forEach(clone => track.insertBefore(clone, cards[0]));
        cards = Array.from(track.querySelectorAll('.property-card')); 
        currentIndex += visibleCards; 
        track.style.transition = 'none'; 
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`; 
        setTimeout(() => track.style.transition = 'transform 0.3s ease', 0); 
    }

    function updateCarousel() {
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    function moveNext() {
        currentIndex++;
        updateCarousel();

        if (currentIndex >= cards.length - visibleCards) {
            appendNextSet(); 
        }
    }

    function movePrev() {
        if (currentIndex === 0) {
            prependPrevSet(); 
        }
        currentIndex--;
        updateCarousel();
    }

    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);

    // Auto-scroll
    setInterval(moveNext, 5000);
});




const deleteListing = document.getElementById('dlt-button');
const deleteOverlay = document.getElementById('delete-overlay');
const closeBtn = document.getElementById('close-btn');
const cancelBtn = document.getElementById('cancel-btn');

function showModal() {
    deleteOverlay.style.display = 'flex';  
}


function closeModal() {
    deleteOverlay.style.display = 'none';  
}


deleteListing.addEventListener('click', showModal);

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

deleteOverlay.addEventListener('click', (e) => {
    if (e.target === deleteOverlay) {
        closeModal();
    }
});




// Get the selected real estate ID from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const realEstateId = localStorage.getItem('selectedRealEstateId');
    console.log('Retrieved RealEstate ID:', realEstateId); // Check if ID is retrieved

    if (!realEstateId) {
        console.error('No real estate ID found.');
        return;
    }

    fetchRealEstateDetails(realEstateId); // Fetch details using the ID
});

async function fetchRealEstateDetails(id) {
    try {
        const response = await fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 9d087282-e845-40ec-9e4a-1618e8ddb056', // Use 'Bearer ' followed by the token
                'accept': 'application/json'
            }
            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const realEstateDetails = await response.json();
        console.log('Fetched RealEstate Details:', realEstateDetails); // Log data to confirm it's correct
        displayRealEstateDetails(realEstateDetails); // Pass data to display function
    } catch (error) {
        console.error('Error fetching real estate details:', error);
    }
}

function displayRealEstateDetails(details) {
    // Log the fetched real estate details to check if agent's image is present
    console.log('Fetched RealEstate Details:', details);

    // Log agent's image
    console.log('Agent Image URL:', details.agent ? details.agent.image : 'No agent image available');

    // Update the general details
    document.querySelector('.price').textContent = `${details.price} ₾`;
    document.querySelector('.location').textContent = `${details.city.name}, ${details.address}`;
    document.querySelector('.area').textContent = `Area: ${details.area} m²`;
    document.querySelector('.bedroom').textContent = `Bedrooms: ${details.bedrooms}`;
    document.querySelector('.index').textContent = `ZIP Code: ${details.zip_code}`;

    // Update for sale/rent tag
    const saleTag = document.querySelector('.sale-tag');
    saleTag.textContent = details.is_rental ? 'For Rent' : 'For Sale';

    // Update the listing image
    document.querySelector('.house-image').src = details.image;

    // Check if agent information and image are available
    if (details.agent && details.agent.image) {
        document.querySelector('.human').src = details.agent.image;
    } else {
        document.querySelector('.human').src = 'default-agent-image.png'; // Correct the path to the fallback image
    }

    document.querySelector('.agent-name').textContent = details.agent ? details.agent.name : 'Unknown';
    document.querySelector('.agent-title').textContent = 'Agent';
    document.querySelector('.mail').textContent = details.agent ? details.agent.email : 'No email available';
    document.querySelector('.phone-number').textContent = details.agent ? details.agent.phone : 'No phone available';

    // Update the description
    document.querySelector('.description').textContent = details.description;

    // Update the publication date (assuming it's provided)
    document.querySelector('.date').textContent = `Published on ${formatDate(details.created_at)}`;
}

// Add the formatDate function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}











