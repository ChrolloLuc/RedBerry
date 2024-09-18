let FiltersRegions = { regions: [] };

// Fetch API
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

// Create region dropdown
async function regionDropdown() {
    const dropdownContainer = document.getElementById('regionDropdown');
    const regions = await fetchRegions();

    regions.forEach(region => {
        const label = document.createElement('label');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = region.name;
        checkbox.addEventListener('change', () => updateRegionSelection(region.name));

        const customCheckbox = document.createElement('span');
        customCheckbox.classList.add('custom-checkbox');

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
    submitButton.addEventListener('click', applyRegionFilter);

    buttonContainer.appendChild(submitButton);
    dropdownContainer.appendChild(buttonContainer);
}

function updateRegionSelection(regionName) {
    const index = FiltersRegions.regions.indexOf(regionName);
    if (index > -1) {
        FiltersRegions.regions.splice(index, 1);
    } else {
        FiltersRegions.regions.push(regionName);
    }
}

function applyRegionFilter() {
    updateFilterDisplay();
    applyAllFilters();
    // Close the dropdown here if needed
    // document.getElementById('regionDropdown').style.display = 'none';
}

function applyAllFilters() {
    let filteredData = realEstateData; // Assume realEstateData is your original data array

    if (FiltersRegions.regions.length > 0) {
        filteredData = filteredData.filter(item => FiltersRegions.regions.includes(item.city.region.name));
    }

    // Add other filter conditions here (e.g., bedrooms, price range, etc.)

    generateRealEstateCards(filteredData);
}

function updateFilterDisplay() {
    const filterDisplay = document.querySelector('.filter-display');
    filterDisplay.innerHTML = '';
    
    if (FiltersRegions.regions.length > 0) {
        const filterTag = document.createElement('div');
        filterTag.classList.add('filter-tag');
        filterTag.innerHTML = `
            რეგიონები: ${FiltersRegions.regions.join(', ')}
            <img src="x-icon.png" alt="Remove" class="remove-filter" data-filter="regions">
        `;
        filterDisplay.appendChild(filterTag);
    }

    // Add other filter tags here

    if (FiltersRegions.regions.length > 0) {
        const clearButton = document.createElement('button');
        clearButton.textContent = 'გასუფთავება';
        clearButton.classList.add('clear-filters');
        filterDisplay.appendChild(clearButton);
    }
}

function removeFilter(filterType) {
    if (filterType === 'regions') {
        FiltersRegions.regions = [];
        document.querySelectorAll('#regionDropdown input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    // Handle other filter types here

    updateFilterDisplay();
    applyAllFilters();
}

function clearAllFilters() {
    FiltersRegions.regions = [];
    document.querySelectorAll('#regionDropdown input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    // Reset other filter inputs here

    updateFilterDisplay();
    generateRealEstateCards(realEstateData);
}

// Event delegation for remove filter and clear all filters
document.querySelector('.filter-display').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-filter')) {
        removeFilter(e.target.dataset.filter);
    } else if (e.target.classList.contains('clear-filters')) {
        clearAllFilters();
    }
});

// Call this function when the page loads
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
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
fileUpload.appendChild(fileInput);

const uploadPlaceholder = fileUpload.querySelector('.upload-placeholder');
const filePreview = fileUpload.querySelector('.file-preview');
const previewImage = fileUpload.querySelector('.preview-image');
const removeFileButton = fileUpload.querySelector('.remove-file');

fileUpload.addEventListener('click', (e) => {
    if (e.target !== removeFileButton && e.target !== removeFileButton.querySelector('img')) {
        fileInput.click();
    }
});

fileInput.addEventListener('change', handleFileSelect);

removeFileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    resetFileUpload();
});

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            uploadPlaceholder.style.display = 'none';
            filePreview.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
}

function resetFileUpload() {
    fileInput.value = '';
    previewImage.src = '';
    uploadPlaceholder.style.display = 'flex';
    filePreview.style.display = 'none';
}




//სახელი

const nameInput = document.getElementById('agent-name')
const nameHint = nameInput.nextElementSibling

nameInput.addEventListener('input', ()=>{
    const nameValue = nameInput.value
    if(nameValue.length >= 2 && /^[A-Za-zა-ჰ]+$/.test(nameValue)){
      nameHint.innerHTML = '<img src="check-green.png" alt="Valid" > მინიმუმ ორი სიმბოლო';
      nameHint.style.color = 'green'; 
    } else {
      nameHint.innerHTML = '<img src="check-red.png" alt="Invalid" > ჩაწერეთ ვალიდური მონაცემები';
      nameHint.style.color = 'red'; 
    }
})

// გვარი

const surnameInput = document.getElementById('agent-surname')
const surnameHint = surnameInput.nextElementSibling

surnameInput.addEventListener('input', ()=>{
    const surnameValue = surnameInput.value
    if(surnameValue.length >= 2 && /^[A-Za-zა-ჰ]+$/.test(surnameValue)){
      surnameHint.innerHTML = '<img src="check-green.png" alt="Valid" > მინიმუმ ორი სიმბოლო';
      surnameHint.style.color = 'green'; 
    } else {
      surnameHint.innerHTML = '<img src="check-red.png" alt="Invalid" > ჩაწერეთ ვალიდური მონაცემები';
      surnameHint.style.color = 'red'; 
    }
})

// ელ ფოსტა

const emailInput = document.getElementById('agent-email');
const emailHint = emailInput.nextElementSibling; 

emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value;

    
    if (/^[a-zA-Z0-9._%+-]+@redberry\.ge$/.test(emailValue)) {
        emailHint.innerHTML = '<img src="check-green.png" alt="Valid"> გამოიყენეთ @redberry.ge ფოსტა';
        emailHint.style.color = 'green'; 
    } else {
        emailHint.innerHTML = '<img src="check-red.png" alt="Invalid"> გამოიყენეთ @redberry.ge ფოსტა';
        emailHint.style.color = 'red'; 
    }
});




// ტელეფონის ნომერი

const phoneInput = document.getElementById('agent-phone');
const phoneHint = phoneInput.nextElementSibling; 


phoneInput.addEventListener('input', () => {
    const phoneValue = phoneInput.value;

    if (phoneValue.length >= 2 && /^\d+$/.test(phoneValue)) { 
        phoneHint.innerHTML = '<img src="check-green.png" alt="Valid" > მინიმუმ ორი სიმბოლო';
        phoneHint.style.color = 'green'; 
    } else {
        phoneHint.innerHTML = '<img src="check-red.png" alt="Invalid" > ჩაწერეთ ვალიდური მონაცემები';
        phoneHint.style.color = 'red';
    }
});

//add agent

// cards


// API data simulation

  async function fetchRealEstateData() {
    try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 9d087282-e845-40ec-9e4a-1618e8ddb056', // Replace <your_token> with your actual token
                'accept': 'application/json'
            }
        });
        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const realEstateData = await response.json();
        generateRealEstateCards(realEstateData); // Generate the cards with the fetched data
    } catch (error) {
        console.error('Error fetching real estate data:', error);
    }

}

  
  // Function to generate cards dynamically
  function generateRealEstateCards(data) {
    const realEstateList = document.getElementById("real-estate-list");
    realEstateList.innerHTML = ""; // Clear any previous content
  
    if (data.length === 0) {
      // No matching results
      const noResultsMessage = document.createElement('div');
      noResultsMessage.className = 'no-results-message';
      noResultsMessage.textContent = 'აღნიშნული მონაცემებით განცხადება არ იძებნება';
      realEstateList.appendChild(noResultsMessage);
    } else {
      // Generate cards as before
      data.forEach(item => {
        // Create the card HTML structure
        const cardHTML = `
          <div class="cards">
              <span class="tag">${item.is_rental ? 'ქირავდება' : 'იყიდება'}</span>
            <div class="card-image">
              <img src="${item.image}" alt="${item.address}">
            </div>
            <div class="card-content">
              <div class="card-title">${item.price} ₾</div>
              <div class="card-address"><img src="location.png" alt="location"> ${item.city.name}, ${item.address}</div>
              <div class="card-details">
                <span><img src="bed.png" alt="bed"> ${item.bedrooms}</span>
                <span><img src="square.png" alt="square"> ${item.area} ㎡</span>
                <span><img src="sign.png" alt="sign"> ${item.zip_code}</span>
              </div>
            </div>
          </div>
        `;
        // Append the card to the real estate list
        realEstateList.innerHTML += cardHTML;
      });
    }
  }
  
  // On page load, generate cards
  window.onload = () => {
    fetchRealEstateData();
  };
  
// cards

// Function to filter real estate data by bedroom count

let activeFilters = {};

function updateFilterDisplay() {
    const filterDisplay = document.querySelector('.filter-display');
    filterDisplay.innerHTML = '';
    
    Object.entries(activeFilters).forEach(([key, value]) => {
        const filterTag = document.createElement('div');
        filterTag.classList.add('filter-tag');
        filterTag.innerHTML = `
            ${value} 
            <img src="xphoto.png" alt="Remove" class="remove-filter" data-filter="${key}">
        `;
        filterDisplay.appendChild(filterTag);
    });

    if (Object.keys(activeFilters).length > 0) {
        const clearButton = document.createElement('button');
        clearButton.textContent = 'გასუფთავება';
        clearButton.classList.add('clear-filters');
        filterDisplay.appendChild(clearButton);
    }
}

function applyFilter(filterType, filterValue) {
    activeFilters[filterType] = filterValue;
    updateFilterDisplay();
    applyAllFilters();
}

function applyAllFilters() {
    let filteredData = realEstateData;

    if (activeFilters.bedrooms) {
        filteredData = filteredData.filter(item => item.bedrooms === parseInt(activeFilters.bedrooms));
    }
    // Add other filter conditions here as needed

    generateRealEstateCards(filteredData);
}

function removeFilter(filterType) {
    delete activeFilters[filterType];
    updateFilterDisplay();
    applyAllFilters();
}

function clearAllFilters() {
    activeFilters = {};
    updateFilterDisplay();
    generateRealEstateCards(realEstateData);
}

// Event listener for the bedroom filter button
document.querySelector('.bedroom-choose').addEventListener('click', () => {
    const bedroomCount = document.getElementById('bedroom-count').value;
    applyFilter('bedrooms', bedroomCount);
    document.getElementById('bedroom-dropdown').classList.remove('show');
});

// Event delegation for remove filter and clear all filters
document.querySelector('.filter-display').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-filter')) {
        removeFilter(e.target.dataset.filter);
    } else if (e.target.classList.contains('clear-filters')) {
        clearAllFilters();
    }
});


  