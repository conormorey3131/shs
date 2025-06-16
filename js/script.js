document.addEventListener('DOMContentLoaded', function() {
    console.log("Sixmilebridge Historical Society website script loaded.");

    // Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('mobile-nav-open');
        });
    }

    // Placeholder for contact form submission handling or other JS functionalities
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Basic client-side validation example (can be expanded)
            let name = document.getElementById('name').value.trim();
            let email = document.getElementById('email').value.trim();
            let message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                // alert('Please fill in all required fields.'); // Basic alert
                // Or, implement a more sophisticated way to show errors
                console.log('Form validation: Please fill in all required fields.');
                // event.preventDefault(); // Prevent submission if fields are empty and not using web3forms' own validation
            } else {
                console.log('Form submitted (or would be, to web3forms).');
                // For web3forms, actual submission is handled by the form's action attribute.
                // You might add code here to show a "sending..." message or similar UX improvements.
            }
        });
    }

    // Intersection Observer for fade-in animations
    const sectionsToFade = document.querySelectorAll('.fade-in-section');
    if (sectionsToFade.length > 0) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the item is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Optional: stop observing once visible
                }
            });
        };

        const fadeInObserver = new IntersectionObserver(observerCallback, observerOptions);
        sectionsToFade.forEach(section => {
            fadeInObserver.observe(section);
        });
    }
});
