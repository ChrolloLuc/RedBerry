document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.listings-track');
    let cards = Array.from(track.querySelectorAll('.property-card'));
    const cardWidth = cards[0].offsetWidth + 20; 
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    let currentIndex = 0;
    const visibleCards = 4;

    
    function appendNextSet() {
        const clones = cards.slice(0, visibleCards).map(card => card.cloneNode(true));
        clones.forEach(clone => track.appendChild(clone));
        cards = Array.from(track.querySelectorAll('.property-card')); 
    }

    
    function prependPrevSet() {
        const clones = cards.slice(-visibleCards).map(card => card.cloneNode(true));
        clones.forEach(clone => track.insertBefore(clone, cards[0]));
        cards = Array.from(track.querySelectorAll('.property-card')); 
        currentIndex += visibleCards; 
        track.style.transition = 'none'; 
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`; 
        setTimeout(() => track.style.transition = 'transform 0.3s ease', 0); 
    }

    function updateCarousel() {
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    function moveNext() {
        currentIndex++;
        updateCarousel();

        if (currentIndex >= cards.length - visibleCards) {
            appendNextSet(); 
        }
    }

    function movePrev() {
        if (currentIndex === 0) {
            prependPrevSet(); 
        }
        currentIndex--;
        updateCarousel();
    }

    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);

    // Auto-scroll
    setInterval(moveNext, 5000);
});




const deleteListing = document.getElementById('dlt-button');
const deleteOverlay = document.getElementById('delete-overlay');
const closeBtn = document.getElementById('close-btn');
const cancelBtn = document.getElementById('cancel-btn');

function showModal() {
    deleteOverlay.style.display = 'flex';  
}


function closeModal() {
    deleteOverlay.style.display = 'none';  
}


deleteListing.addEventListener('click', showModal);

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

deleteOverlay.addEventListener('click', (e) => {
    if (e.target === deleteOverlay) {
        closeModal();
    }
});

