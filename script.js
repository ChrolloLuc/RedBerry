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


// API data simulation
const realEstateData = [
    {
        "id": 902,
        "address": "ნოკრელა სითი",
        "zip_code": "0101",
        "price": 154867,
        "area": 100.5,
        "bedrooms": 4,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/qumdIhZlm7tPokBdfCazZpclHyUsqXNYjBfGOSX3.png",
        "is_rental": 0,
        "city_id": 1,
        "city": {
          "id": 1,
          "name": "სოხუმი",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      },
      {
        "id": 903,
        "address": "ნოკრელა სითი",
        "zip_code": "0101",
        "price": 154867,
        "area": 75,
        "bedrooms": 4,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/Sb6yiMWUuYbKaBNH11tF6f0FKVmd3uLEhzecwrc3.png",
        "is_rental": 0,
        "city_id": 2,
        "city": {
          "id": 2,
          "name": "გაგრა",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      },
      {
        "id": 904,
        "address": "ნოკრელა სითი",
        "zip_code": "0101",
        "price": 100000,
        "area": 34,
        "bedrooms": 1,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/KVnaQdC4qACqbkq8cnFuyf7wenTMa1nlA7TDyNH0.png",
        "is_rental": 0,
        "city_id": 3,
        "city": {
          "id": 3,
          "name": "ოჩამჩირე",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      },
      {
        "id": 905,
        "address": "მუხიანი",
        "zip_code": "0101",
        "price": 99991,
        "area": 150,
        "bedrooms": 6,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/px0YKsQvn8ybraucjnH1miVY6e9gb58UXMQf5xlW.png",
        "is_rental": 0,
        "city_id": 4,
        "city": {
          "id": 4,
          "name": "გუდაუთა",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      },
      {
        "id": 906,
        "address": "საბურთალო",
        "zip_code": "0102",
        "price": 87000,
        "area": 210,
        "bedrooms": 1,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/Eoa5toa87Bn9qlkrxmB5h4YrwYBCDhmpi8Sza4Pm.png",
        "is_rental": 0,
        "city_id": 5,
        "city": {
          "id": 5,
          "name": "გალი",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      },
      {
        "id": 907,
        "address": "კრწანისი",
        "zip_code": "0103",
        "price": 87000,
        "area": 144,
        "bedrooms": 10,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/2rV6T5r8FbuXRxUcsbqd1h1rKMWr0St4MofL6J1H.png",
        "is_rental": 0,
        "city_id": 7,
        "city": {
          "id": 7,
          "name": "ახალი ათონი",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      },
      {
        "id": 908,
        "address": "ისანი",
        "zip_code": "0103",
        "price": 87000,
        "area": 14,
        "bedrooms": 3,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/Rb19ujL8Un2qXn0Jh8hHtAgYUShY8efQjHRpjwq5.png",
        "is_rental": 0,
        "city_id": 1,
        "city": {
          "id": 1,
          "name": "სოხუმი",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      },
      {
        "id": 909,
        "address": "ლიმგრეივი",
        "zip_code": "0104",
        "price": 201000,
        "area": 14,
        "bedrooms": 4,
        "image": "https://api.real-estate-manager.redberryinternship.ge/storage/images/2kzrHviGTEkMUOOKTe7xZbiYv5tYrbKAXHlEWTBp.png",
        "is_rental": 0,
        "city_id": 3,
        "city": {
          "id": 3,
          "name": "ოჩამჩირე",
          "region_id": 1,
          "region": {
            "id": 1,
            "name": "აფხაზეთი"
          }
        }
      }
  ]
  
  // Function to generate cards dynamically
  function generateRealEstateCards(data) {
    const realEstateList = document.getElementById("real-estate-list");
    realEstateList.innerHTML = ""; // Clear any previous content
  
    data.forEach(item => {
      // Create the card HTML structure
      const cardHTML = `
      
        <div class="cards">
            <span class="tag">იყიდება</span>
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
  
  // On page load, generate cards
  window.onload = () => {
    generateRealEstateCards(realEstateData);
  };
  
// cards

// Function to filter real estate data by bedroom count

function filterByBedroomCount(count) {
    const filteredData = realEstateData.filter(item => item.bedrooms === count);
    generateRealEstateCards(filteredData);
  }
  
  // Event listener for the bedroom filter button
  
  document.querySelector('.bedroom-choose').addEventListener('click', () => {
    const bedroomCount = parseInt(document.getElementById('bedroom-count').value);
    filterByBedroomCount(bedroomCount);
    document.getElementById('bedroom-dropdown').classList.remove('show');
  });
  
  
  // Toggle dropdown visibility
  
  document.getElementById('bedroom-button').addEventListener('click', () => {
    document.getElementById('bedroom-dropdown').classList.toggle('show');
  });
  
  

  