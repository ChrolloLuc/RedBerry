// fetch api
async function fetchRegions() {
    try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch regions:", error);
        return []; 
    }
}
// fetch api

// create region dropdown
async function regionDropdown() {
    const dropdownContainer = document.getElementById('regionDropdown');
    const regions = await fetchRegions();

    regions.forEach(region => {
        const label = document.createElement('label');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = region.name;

        const customCheckbox = document.createElement('span');

        label.appendChild(checkbox);
        label.appendChild(customCheckbox);
        label.appendChild(document.createTextNode(region.name));

        dropdownContainer.appendChild(label);
    });

    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-btn');
    submitButton.textContent = 'არჩევა';

    buttonContainer.appendChild(submitButton);
    dropdownContainer.appendChild(buttonContainer);
}

regionDropdown();


const regionButton = document.getElementById('regionButton');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.region-dropdown');

dropdownContent.style.visibility = 'hidden';
dropdownContent.style.opacity = 0;

regionButton.addEventListener('click', function() {
    const isVisible = dropdownContent.style.visibility === 'visible';

    if (isVisible) {
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.opacity = 0;
        dropdown.classList.remove('active');
    } else {
        dropdownContent.style.visibility = 'visible';
        dropdownContent.style.opacity = 1;
        dropdown.classList.add('active');
    }
});
// region dropdown



// pricedropdown
document.addEventListener('DOMContentLoaded', function() {
    const priceCategoryButton = document.getElementById('priceCategory');
    const priceDropdownContainer = document.querySelector('.price-dropdown');

    
    priceCategoryButton.addEventListener('click', function() {
        priceDropdownContainer.classList.toggle('active');
    });

    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');

    minInput.addEventListener('change', function() {
        if (parseInt(maxInput.value) < parseInt(this.value)) {
            maxInput.value = this.value;
        }
    });

    maxInput.addEventListener('change', function() {
        if (parseInt(minInput.value) > parseInt(this.value)) {
            minInput.value = this.value;
        }
    });

    document.querySelector('.price-btn').addEventListener('click', function() {
        const minPrice = minInput.value;
        const maxPrice = maxInput.value;
        console.log(`Selected price range: ${minPrice} - ${maxPrice} ₾`);
        
    });
});
// pricedropdown






// bedroom dropdown
const bedroomButton = document.getElementById('bedroom-button');
const bedroomDropdown = document.getElementById('bedroom-dropdown');

bedroomButton.addEventListener('click', () => {
    bedroomButton.classList.toggle('active');
});
// bedroom dropdwon



//area dropdown

const areaButton = document.getElementById('area-button')
const areaDropdown = document.getElementById('area-dropdown')

areaButton.addEventListener('click', () =>{
    areaButton.classList.toggle('active')
})

//area dropdown



//add agent

const agentButton = document.getElementById('agent-button');
const modal = document.getElementById('agent-modal');
const body = document.body;
const cancelButton = document.querySelector('.agent-form-btn-cancel');

// Function to hide the modal
function closeModal() {
    modal.classList.add('hidden');
    body.classList.remove('modal-open');
    modal.classList.remove('modal-active');
}

// Show the modal when the agent button is clicked
agentButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');
    setTimeout(() => {
        modal.classList.add('modal-active');
    }, 10);
});


modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});


cancelButton.addEventListener('click', () => {
    closeModal();
});

// Handle file upload
const fileUpload = document.getElementById('agent-photo');

fileUpload.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileUpload.style.backgroundImage = `url(${e.target.result})`;
                fileUpload.style.backgroundSize = 'cover';
                fileUpload.textContent = '';
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

//add agent

// cards

const apiUrl = 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates';
const token = '9d05fa86-f508-47f7-ae9e-56543ac5037'; 

async function fetchRealEstateListings() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const listings = await response.json();
    console.log(listings); // Check the fetched data here
    
    displayRealEstateListings(listings);
  } catch (error) {
    console.error('Error fetching real estate listings:', error);
  }
}

function displayRealEstateListings(listings) {
  const listingsContainer = document.getElementById('real-estate-list');

  // Clear previous content
  listingsContainer.innerHTML = '';

  listings.forEach(listing => {
    const saleOrRent = listing.is_rental ? 'For Rent' : 'For Sale';

    // Create the HTML structure for each card
    const cardHtml = `
      <div class="cards">
        <img src="${listing.image}" alt="Property Image">
        <div class="card-details">
          <h3 class="card-price">${listing.price} ₾</h3>
          <p><strong>Address:</strong> ${listing.address}, ${listing.city.name}</p>
          <p><strong>City:</strong> ${listing.city.name}</p>
          <p><strong>ZIP Code:</strong> ${listing.zip_code}</p>
          <p><strong>Area:</strong> ${listing.area} m²</p>
          <p><strong>Bedrooms:</strong> ${listing.bedrooms}</p>
          <p class="card-tag">${saleOrRent}</p>
        </div>
      </div>
    `;

    // Append each card to the container
    listingsContainer.innerHTML += cardHtml;
  });
}

// Call the function to fetch and display the listings
fetchRealEstateListings();




// cards