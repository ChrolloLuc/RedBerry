document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.listings-track');
    const cards = Array.from(track.querySelectorAll('.property-card'));
    const cardWidth = cards[0].offsetWidth + 20; // Include margin
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    // Clone items for infinite effect
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let currentIndex = 0;
    const totalCards = cards.length;
    const visibleCards = 4; // Number of cards visible at once

    function updateCarousel() {
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    function moveNext() {
        currentIndex++;
        if (currentIndex >= totalCards) {
            // If we've moved beyond the original set, jump back to start instantly
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                updateCarousel();
                setTimeout(() => {
                    track.style.transition = 'transform 0.3s ease';
                }, 10);
            }, 300);
        } else {
            updateCarousel();
        }
    }

    function movePrev() {
        if (currentIndex <= 0) {
            // If we're at the start, jump to the end instantly
            track.style.transition = 'none';
            currentIndex = totalCards;
            updateCarousel();
            setTimeout(() => {
                track.style.transition = 'transform 0.3s ease';
                currentIndex--;
                updateCarousel();
            }, 10);
        } else {
            currentIndex--;
            updateCarousel();
        }
    }

    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);

    // Auto-scroll
    setInterval(moveNext, 5000);
});