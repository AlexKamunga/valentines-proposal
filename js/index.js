document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('noButton');
    
    // Handle mouse events
    button.addEventListener('mouseover', moveButton);
    
    // Handle touch events
    button.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent default touch behavior
        moveButton();
    });
    
    button.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Prevent scrolling while touching button
    });
});

function moveButton() {
    const button = document.getElementById('noButton');
    button.style.position = 'fixed';  // Change to fixed only when moving
    
    const windowWidth = window.innerWidth - button.offsetWidth;
    const windowHeight = window.innerHeight - button.offsetHeight;
    
    const randomX = Math.floor(Math.random() * windowWidth);
    const randomY = Math.floor(Math.random() * windowHeight);
    
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    
}