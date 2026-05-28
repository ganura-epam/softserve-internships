// SoftServe Internship Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Form submission handling
    const form = document.getElementById('applicationForm');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            // Create FormData object
            const formData = new FormData(form);

            // PRODUCTION MODE: Real form submission to FormSpree
            try {
                // Submit to FormSpree
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✓ Application submitted successfully! We will contact you soon.';
                    form.reset();

                    // Scroll to status message
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                    // Redirect to top of page after 3 seconds
                    setTimeout(function() {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        formStatus.style.display = 'none';
                    }, 3000);
                } else {
                    // Error
                    const data = await response.json();
                    formStatus.className = 'form-status error';
                    formStatus.textContent = '✗ ' + (data.error || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                // Network error
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Network error. Please check your connection and try again.';
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }
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

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    document.querySelectorAll('.card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            // Basic formatting - can be customized based on region
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value ? '+91 ' + value : '';
        });
    }

    // Form validation feedback
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });

        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = '#10b981';
            }
        });
    });

    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ef4444';
            } else if (this.value) {
                this.style.borderColor = '#10b981';
            }
        });
    }

    // Add loading animation to hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle && heroSubtitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
        }, 300);
    }

    // Console message for developers
    console.log('%cSoftServe Internships', 'font-size: 24px; font-weight: bold; color: #2563eb;');
    console.log('%cInterested in how this was built? Apply for our Web Development internship!', 'font-size: 14px; color: #64748b;');
});
