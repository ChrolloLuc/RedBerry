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