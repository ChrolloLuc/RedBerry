const photoUpload = document.getElementById('photo-upload');

        photoUpload.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        photoUpload.style.backgroundImage = `url(${e.target.result})`;
                        photoUpload.style.backgroundSize = 'cover';
                        photoUpload.querySelector('span').style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });


// მისამართი


const addressInput = document.getElementById('address')
const addressHint = addressInput.nextElementSibling

addressInput.addEventListener('input', ()=>{
    const addressValue = addressInput.value
    if(addressValue.length >= 2 && /^[A-Za-zა-ჰ]+$/.test(addressValue)){
        addressHint.innerHTML = '<img src="check-green.png" alt="Valid" > მინიმუმ ორი სიმბოლო';
        addressHint.style.color = 'green'; 
    } else {
        addressHint.innerHTML = '<img src="check-red.png" alt="Invalid" > ჩაწერეთ ვალიდური მონაცემები';
        addressHint.style.color = 'red'; 
    }
})  