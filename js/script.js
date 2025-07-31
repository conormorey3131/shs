document.addEventListener('DOMContentLoaded', function() {
    console.log("Sixmilebridge Historical Society website script loaded.");
    
    // Performance optimization - use passive listeners where appropriate
    const supportsPassive = (() => {
        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        return supportsPassive;
    })();

    // Enhanced Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');
    const body = document.body;

    if (hamburger && nav) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = nav.classList.contains('mobile-nav-open');
            
            // Toggle classes with animation
            nav.classList.toggle('mobile-nav-open');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (isOpen) {
                body.style.overflow = '';
            } else {
                body.style.overflow = 'hidden';
            }
            
            // Add haptic feedback on mobile
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
        
        // Close menu when clicking outside or on links
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('mobile-nav-open');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('mobile-nav-open')) {
                nav.classList.remove('mobile-nav-open');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu when nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-nav-open');
                hamburger.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Enhanced Contact Form with Better UX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : '';
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
        
        contactForm.addEventListener('submit', function(event) {
            // Enhanced validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Validate each field
            if (!validateField({ target: name })) isValid = false;
            if (!validateField({ target: email })) isValid = false;
            if (!validateField({ target: message })) isValid = false;
            
            if (!isValid) {
                event.preventDefault();
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Show loading state
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }
            
            // Add haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
            
            console.log('Form submitted successfully');
        });
        
        function validateField(event) {
            const field = event.target;
            const value = field.value.trim();
            let isValid = true;
            
            // Remove existing error styling
            field.classList.remove('error');
            removeErrorMessage(field);
            
            // Validate based on field type
            if (field.hasAttribute('required') && value === '') {
                showFieldError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && value !== '' && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.id === 'message' && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            return isValid;
        }
        
        function clearErrors(event) {
            const field = event.target;
            field.classList.remove('error');
            removeErrorMessage(field);
        }
        
        function showFieldError(field, message) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
        
        function removeErrorMessage(field) {
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Enhanced Intersection Observer for multiple animation types
    const animatedElements = document.querySelectorAll('.fade-in-section, .fade-in-left, .fade-in-right, .scale-in');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-50px 0px', // Start animation when element is 50px into viewport
            threshold: [0, 0.1, 0.5, 1] // Multiple thresholds for different effects
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple elements
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100);
                    
                    // Continue observing for scroll-based effects
                    // observer.unobserve(entry.target);
                }
            });
        };

        const animationObserver = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced Gallery with Lightbox Effect
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length > 0) {
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                openLightbox(this, index, galleryImages);
            });
            
            // Add loading animation
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    }
    
    // Performance: Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loading');
                    img.addEventListener('load', () => {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    });
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Simple lightbox implementation
    function openLightbox(img, index, allImages) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-caption">${img.alt}</div>
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">‹</button>
                <button class="lightbox-next">›</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => lightbox.classList.add('show'), 10);
        
        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => lightbox.remove(), 300);
        }
        
        // Event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', function handleKeydown(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleKeydown);
            }
        });
    }
    
    // Add CSS for new features
    const style = document.createElement('style');
    style.textContent = `
        .field-error {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        }
        
        input.error, textarea.error {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.25rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-info { background: var(--color-secondary); }
        .notification-error { background: #dc3545; }
        .notification-success { background: #28a745; }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.show {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        }
        
        .lightbox img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
        }
        
        .lightbox-caption {
            text-align: center;
            color: white;
            padding: 1rem;
            font-size: 1.1rem;
        }
        
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
        }
        
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255,255,255,0.3);
        }
        
        .lightbox-close {
            top: 20px;
            right: 20px;
        }
        
        .lightbox-prev {
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-next {
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        img.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: loading 1.5s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Page loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Hide loading screen if it exists
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });
    
    // Smooth scroll behavior for better UX
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }, supportsPassive ? { passive: true } : false);
    
    // Add scroll-to-top button styles
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: var(--color-accent);
            color: var(--color-primary);
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
        }
        
        .scroll-to-top.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-to-top:hover {
            background: var(--color-primary);
            color: var(--color-light);
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }
        
        body.loaded {
            animation: pageLoad 0.5s ease;
        }
        
        @keyframes pageLoad {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(scrollStyle);
    
    console.log('Enhanced Sixmilebridge Historical Society website fully loaded!');
});