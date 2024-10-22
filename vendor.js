let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

const infoCards = document.querySelector('.info-cards');
const cards = Array.from(document.querySelectorAll('.info-card'));

// Mouse and touch events
infoCards.addEventListener('mousedown', touchStart);
infoCards.addEventListener('touchstart', touchStart);
infoCards.addEventListener('mousemove', touchMove);
infoCards.addEventListener('touchmove', touchMove);
infoCards.addEventListener('mouseup', touchEnd);
infoCards.addEventListener('touchend', touchEnd);
infoCards.addEventListener('mouseleave', touchEnd);

// Prevent right click menu
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    infoCards.style.cursor = 'grabbing';
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    // If the user moved the card more than 100px, slide to next/prev card
    if (movedBy < -100 && currentIndex < cards.length - 1) {
        currentIndex += 1;
    }
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionByIndex();
    infoCards.style.cursor = 'grab';
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    infoCards.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -infoCards.clientWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}// Optional: Example for changing the image source using JS
document.getElementById('vendorImage').src = 'Vendor.png'; // Sets the source to 'Vendor.png'


