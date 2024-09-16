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