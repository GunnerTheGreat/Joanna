document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.overlay');
  const overlayImage = overlay.querySelector('.overlay-image');
  const overlayTitle = overlay.querySelector('.overlay-title');
  const overlayDescription = overlay.querySelector('.description-text');
  const prevBtn = overlay.querySelector('.prev-btn');
  const nextBtn = overlay.querySelector('.next-btn');

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const images = Array.from(document.querySelectorAll('.img-wrapper'));

  // Function to update overlay content
  function updateOverlay(index) {
    const wrapper = images[index];
    overlayImage.src = wrapper.querySelector('img').src;
    overlayTitle.textContent = wrapper.dataset.title || '';
    overlayDescription.textContent = wrapper.dataset.description || 'No description available';
    currentIndex = index;
  }

  // Open overlay
  document.querySelectorAll('.img-wrapper').forEach((wrapper, index) => {
    wrapper.addEventListener('click', (e) => {
      e.preventDefault();
      updateOverlay(index);
      overlay.classList.add('active');
    });
  });

  // Close overlay
  overlay.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay') || e.target.classList.contains('close-btn')) {
      overlay.classList.remove('active');
    }
  });

  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateOverlay(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateOverlay(currentIndex);
  });

  // Swipe gestures
  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  overlay.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  });

  overlay.addEventListener('touchend', () => {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right -> previous image
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      } else {
        // Swipe left -> next image
        currentIndex = (currentIndex + 1) % images.length;
      }
      updateOverlay(currentIndex);
    }
  });
});
