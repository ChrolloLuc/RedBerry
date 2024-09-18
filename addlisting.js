// file upload
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


// მისამართი


const addressInput = document.getElementById('address');
const addressHint = addressInput.nextElementSibling;

addressInput.addEventListener('input', () => {
    const addressValue = addressInput.value.trim();
    if (addressValue.length >= 2) {
        addressHint.innerHTML = '<img src="check-green.png" alt="Valid"> მინიმუმ ორი სიმბოლო';
        addressHint.style.color = 'green';
    } else {
        addressHint.innerHTML = '<img src="check-red.png" alt="Invalid"> ჩაწერეთ ვალიდური მონაცემები';
        addressHint.style.color = 'red';
    }
});

// საფოსტო ინდექსი
const postalInput = document.getElementById('postal-code');
const postalHint = postalInput.nextElementSibling;

postalInput.addEventListener('input', () => {
    const postalValue = postalInput.value.trim();
    if (/^\d+$/.test(postalValue)) {
        postalHint.innerHTML = '<img src="check-green.png" alt="Valid"> მხოლოდ რიცხვები';
        postalHint.style.color = 'green';
    } else {
        postalHint.innerHTML = '<img src="check-red.png" alt="Invalid"> ჩაწერეთ ვალიდური მონაცემები';
        postalHint.style.color = 'red';
    }
});

// ფასი

const priceInput = document.getElementById('price');
const priceHint = priceInput.nextElementSibling;

priceInput.addEventListener('input', () => {
    const priceValue = priceInput.value.trim();
    if (/^\d+$/.test(priceValue)) {
        priceHint.innerHTML = '<img src="check-green.png" alt="Valid"> მხოლოდ რიცხვები';
        priceHint.style.color = 'green';
    } else {
        priceHint.innerHTML = '<img src="check-red.png" alt="Invalid"> ჩაწერეთ ვალიდური მონაცემები';
        priceHint.style.color = 'red';
    }
});


// საძინებელი

const bedroomsInput = document.getElementById('bedrooms');
const bedroomsHint = bedroomsInput.nextElementSibling;

bedroomsInput.addEventListener('input', () => {
    const bedroomsValue = bedroomsInput.value.trim();
    if (/^\d+$/.test(bedroomsValue)) {
        bedroomsHint.innerHTML = '<img src="check-green.png" alt="Valid"> მხოლოდ რიცხვები';
        bedroomsHint.style.color = 'green';
    } else {
        bedroomsHint.innerHTML = '<img src="check-red.png" alt="Invalid"> ჩაწერეთ ვალიდური მონაცემები';
        bedroomsHint.style.color = 'red';
    }
});

// ფართობი

const areaInput = document.getElementById('area');
const areaHint = areaInput.nextElementSibling;

areaInput.addEventListener('input', () => {
    const areaValue = areaInput.value.trim();
    if (/^\d+$/.test(areaValue)) {
        areaHint.innerHTML = '<img src="check-green.png" alt="Valid"> მხოლოდ რიცხვები';
        areaHint.style.color = 'green';
    } else {
        areaHint.innerHTML = '<img src="check-red.png" alt="Invalid"> ჩაწერეთ ვალიდური მონაცემები';
        areaHint.style.color = 'red';
    }
});


// აღწერა

const descriptionInput = document.getElementById('description');
const descriptionHint = descriptionInput.nextElementSibling;

descriptionInput.addEventListener('input', () => {
    const descriptionValue = descriptionInput.value.trim(); 
    const wordCount = descriptionValue.split(/\s+/).filter(word => word.length > 0).length; 

    if (wordCount >= 5) {
        descriptionHint.innerHTML = '<img src="check-green.png" alt="Valid" > მინიმუმ ხუთი სიტყვა';
        descriptionHint.style.color = 'green';
    } else {
        descriptionHint.innerHTML = '<img src="check-red.png" alt="Invalid" > მინიმუმ ხუთი სიტყვა';
        descriptionHint.style.color = 'red';
    }
});


// fetch 

const regionSelect = document.getElementById('region');
const citySelect = document.getElementById('city');
let allCities = []; 

// fetch regions
async function fetchRegions() {
    try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions');
        const regions = await response.json();

        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region.id;
            option.textContent = region.name;
            regionSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching regions:', error);
    }
}

// fetch all cities
async function fetchCities() {
    try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/cities');
        allCities = await response.json(); 
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

// filter cities based on id
function updateCityDropdown(regionId) {
    const filteredCities = allCities.filter(city => city.region_id === parseInt(regionId));
    
    // Clear previous city options
    citySelect.innerHTML = '<option value="">აირჩიეთ ქალაქი</option>';

    // Populate the city dropdown with filtered cities
    filteredCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// Event listener for region select
regionSelect.addEventListener('change', function() {
    const selectedRegionId = regionSelect.value;
    if (selectedRegionId) {
        updateCityDropdown(selectedRegionId);
    } else {
        citySelect.innerHTML = '<option value="">აირჩიეთ ქალაქი</option>'; // Reset cities if no region is selected
    }
});


fetchRegions(); 
fetchCities();  


//fetch agents

const agentSelect = document.getElementById('agent');

async function fetchAgents() {
    try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 9d087282-e845-40ec-9e4a-1618e8ddb056', 
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const agents = await response.json();

        // Populate the select element with agents
        agents.forEach(agent => {
            const option = document.createElement('option');
            option.value = agent.id; // Set the agent's id as the value
            option.textContent = `${agent.name} ${agent.surname}`; // Display the name and surname
            agentSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching agents:', error);
    }
}

// Call the function to fetch and populate agents on page load
fetchAgents();



