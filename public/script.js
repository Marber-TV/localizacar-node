document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const bg = document.querySelector('.bg');
    const secondPage = document.querySelector('.second-page');

    if (scrollPosition > 0) {
        bg.style.transform = 'translateY(-100vh)'; // Move background up
        secondPage.style.display = 'block'; // Show second page
    } else {
        bg.style.transform = 'translateY(0)'; // Reset background position
        secondPage.style.display = 'none'; // Hide second page
    }
});

// To trigger the transition on initial load
document.dispatchEvent(new Event('scroll'));
