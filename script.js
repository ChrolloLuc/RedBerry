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

let apiDataCity = [];

function populateCityDropdown(regionId) {

    const cityDropdown = document.getElementById('cityDropdown');
    cityDropdown.innerHTML = ''; 

    const filteredCities = apiDataCity.filter(city => city.region_id === regionId);

    if (filteredCities.length === 0) {

        cityDropdown.innerHTML = '<p>No cities available</p>';

    } else {

        filteredCities.forEach(city => {

            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = city.name;

            const customCheckbox = document.createElement('span');


            label.appendChild(checkbox);
            label.appendChild(customCheckbox);
            label.appendChild(document.createTextNode(city.name));

            cityDropdown.appendChild(label);
        });
    }
}



function populateDropdown() {
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

populateDropdown();


const regionButton = document.getElementById('regionButton');
const dropdownContent = document.querySelector('.dropdown-content');


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