const apiDataRegion = [
    { "id": 1, "name": "აფხაზეთი" },
    { "id": 2, "name": "აჭარა" },
    { "id": 3, "name": "გურია" },
    { "id": 4, "name": "თბილისი" },
    { "id": 5, "name": "იმერეთი" },
    { "id": 6, "name": "კახეთი" },
    { "id": 7, "name": "მცხეთა-მთიანეთი" },
    { "id": 8, "name": "რაჭა-ლეჩხუმი" },
    { "id": 9, "name": "სამეგრელო" },
    { "id": 10, "name": "სამცხე-ჯავახეთი" },
    { "id": 11, "name": "ქვემო ქართლი" },
    { "id": 12, "name": "შიდა ქართლი" }
];

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

const regionButton = document.getElementById('regionButton');
const dropdownContent = document.querySelector('.dropdown-content');

// pricedropdown
document.addEventListener('DOMContentLoaded', function() {
    const priceCategoryButton = document.getElementById('priceCategory');
    const priceDropdownContainer = document.querySelector('.price-dropdown');

    // Toggle visibility of price dropdown when the button is clicked
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

    document.querySelector('.submit-btn').addEventListener('click', function() {
        const minPrice = minInput.value;
        const maxPrice = maxInput.value;
        console.log(`Selected price range: ${minPrice} - ${maxPrice} ₾`);
        // Here you can add code to handle the selected price range
    });
});
// pricedropdown




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


