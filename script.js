// const apiDataRegion = [
//     { "id": 1, "name": "აფხაზეთი" },
//     { "id": 2, "name": "აჭარა" },
//     { "id": 3, "name": "გურია" },
//     { "id": 4, "name": "თბილისი" },
//     { "id": 5, "name": "იმერეთი" },
//     { "id": 6, "name": "კახეთი" },
//     { "id": 7, "name": "მცხეთა-მთიანეთი" },
//     { "id": 8, "name": "რაჭა-ლეჩხუმი" },
//     { "id": 9, "name": "სამეგრელო" },
//     { "id": 10, "name": "სამცხე-ჯავახეთი" },
//     { "id": 11, "name": "ქვემო ქართლი" },
//     { "id": 12, "name": "შიდა ქართლი" }
// ];
async function fetchRegions() {
    try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions');
        if (!response.ok) {
            throw new Error(`Error fetching regions: ${response.statusText}`);
        }
        const apiDataRegion = await response.json(); 
        populateRegionDropdown(apiDataRegion); 
    } catch (error) {
        console.error('Failed to fetch region data:', error);
    }
}

function populateRegionDropdown(apiDataRegion) {
    const dropdownContainer = document.getElementById('regionDropdown');
    
    // Clear previous dropdown content if any
    dropdownContainer.innerHTML = '';

    // Iterate over the fetched regions and create dropdown options
    apiDataRegion.forEach(region => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = region.name; // Use name from API data

        const customCheckbox = document.createElement('span');
        
        label.appendChild(checkbox);
        label.appendChild(customCheckbox);
        label.appendChild(document.createTextNode(region.name));

        dropdownContainer.appendChild(label);
    });

    // Create a submit button for regions
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-btn');
    submitButton.textContent = 'არჩევა'; // "Select" button text

    buttonContainer.appendChild(submitButton);
    dropdownContainer.appendChild(buttonContainer);
}

// Fetch and populate region dropdown on page load
document.addEventListener('DOMContentLoaded', fetchRegions);

const regionButton = document.getElementById('regionButton');
const dropdownContent = document.querySelector('.dropdown-content');




// let apiDataCity = [];

// function populateCityDropdown(regionId) {

//     const cityDropdown = document.getElementById('cityDropdown');
//     cityDropdown.innerHTML = ''; 

//     const filteredCities = apiDataCity.filter(city => city.region_id === regionId);

//     if (filteredCities.length === 0) {

//         cityDropdown.innerHTML = '<p>No cities available</p>';

//     } else {

//         filteredCities.forEach(city => {

//             const label = document.createElement('label');
//             const checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             checkbox.value = city.name;

//             const customCheckbox = document.createElement('span');


//             label.appendChild(checkbox);
//             label.appendChild(customCheckbox);
//             label.appendChild(document.createTextNode(city.name));

//             cityDropdown.appendChild(label);
//         });
//     }
// }



function regionDropdown() {
    const dropdownContainer = document.getElementById('regionDropdown');

    apiDataRegion.forEach(region => {
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
    // buttonis divi
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container')

    // tviton buttoni
    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-btn');
    submitButton.textContent = 'არჩევა';
    // gavgzavnot
    
    buttonContainer.appendChild(submitButton);
    dropdownContainer.appendChild(buttonContainer);
    


}

regionDropdown();

// const regionButton = document.getElementById('regionButton');
// const dropdownContent = document.querySelector('.dropdown-content');


const priceData = [50000, 100000, 150000, 200000, 300000]; 

function populatePriceDropdown() {
    const priceDropdownContainer = document.getElementById('priceDropdown');

    // Create price input fields
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('price-inputs');

    // Create Min price input
    const minInputWrapper = document.createElement('div');
    minInputWrapper.classList.add('price-input');
    const minInput = document.createElement('input');
    minInput.type = 'number';
    minInput.placeholder = 'მინ. ფასი';
    minInputWrapper.appendChild(minInput);

    // Create Max price input
    const maxInputWrapper = document.createElement('div');
    maxInputWrapper.classList.add('price-input');
    const maxInput = document.createElement('input');
    maxInput.type = 'number';
    maxInput.placeholder = 'მაქს. ფასი';
    maxInputWrapper.appendChild(maxInput);

    // Append input fields to container
    inputContainer.appendChild(minInputWrapper);
    inputContainer.appendChild(maxInputWrapper);
    priceDropdownContainer.appendChild(inputContainer);

    // Create two columns for min and max prices
    const minPriceColumn = document.createElement('div');
    minPriceColumn.classList.add('price-column');
    const maxPriceColumn = document.createElement('div');
    maxPriceColumn.classList.add('price-column');

    // Create headers for the columns
    const minHeader = document.createElement('h4');
    minHeader.textContent = 'მინ. ფასი';
    const maxHeader = document.createElement('h4');
    maxHeader.textContent = 'მაქს. ფასი';
    
    minPriceColumn.appendChild(minHeader);
    maxPriceColumn.appendChild(maxHeader);

    // Populate price options dynamically
    priceData.forEach(price => {
        // Min price options
        const minPriceOption = document.createElement('div');
        minPriceOption.classList.add('price-option');
        minPriceOption.textContent = `${price.toLocaleString()} ₾`;
        minPriceOption.addEventListener('click', () => {
            minInput.value = price; // Set min input to selected value
        });
        minPriceColumn.appendChild(minPriceOption);

        // Max price options
        const maxPriceOption = document.createElement('div');
        maxPriceOption.classList.add('price-option');
        maxPriceOption.textContent = `${price.toLocaleString()} ₾`;
        maxPriceOption.addEventListener('click', () => {
            maxInput.value = price; // Set max input to selected value
        });
        maxPriceColumn.appendChild(maxPriceOption);
    });

    // Append the price columns to the container
    priceDropdownContainer.appendChild(minPriceColumn);
    priceDropdownContainer.appendChild(maxPriceColumn);

    // Add a submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-btn');
    submitButton.textContent = 'არჩევა';
    priceDropdownContainer.appendChild(submitButton);
}

// Call the function to populate the dropdown when the DOM is ready
document.addEventListener('DOMContentLoaded', populatePriceDropdown);




// function priceDropdown(){
//     const PricedropdownContainer = document.getElementById('priceDropdown');
//     const priceLabel = document.createElement('label')



//     const buttonPrice = document.createElement('div');
//     buttonPrice.classList.add('button-container')



// }

// priceDropdown()
// const PriceButton = document.getElementById('priceCategory');






dropdownContent.style.visibility = 'hidden';
dropdownContent.style.opacity = 0;

regionButton.addEventListener('click', function() {
    const isVisible = dropdownContent.style.visibility === 'visible';
    
    if (isVisible) {
        
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.opacity = 0;
    } else {
        
        dropdownContent.style.visibility = 'visible';
        dropdownContent.style.opacity = 1;
    }
});



