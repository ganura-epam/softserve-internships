// SoftServe Internship Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Initialize EmailJS (will be configured with your credentials)
    // You'll need to replace these with your actual EmailJS credentials from setup
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

    // File upload handling
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('resume');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileRemoveBtn = document.getElementById('fileRemoveBtn');
    let uploadedFile = null;

    if (fileUploadArea && fileInput) {
        // Click to upload
        fileUploadArea.addEventListener('click', function(e) {
            if (e.target !== fileRemoveBtn && !e.target.closest('.file-remove-btn')) {
                fileInput.click();
            }
        });

        // File input change
        fileInput.addEventListener('change', function(e) {
            handleFile(e.target.files[0]);
        });

        // Drag and drop
        fileUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            fileUploadArea.classList.add('drag-over');
        });

        fileUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            fileUploadArea.classList.remove('drag-over');
        });

        fileUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            fileUploadArea.classList.remove('drag-over');
            handleFile(e.dataTransfer.files[0]);
        });

        // Remove file
        fileRemoveBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeFile();
        });
    }

    function handleFile(file) {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload only PDF or DOC files');
            return;
        }

        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB');
            return;
        }

        uploadedFile = file;
        fileName.textContent = file.name;
        fileUploadArea.querySelector('.file-upload-content').style.display = 'none';
        filePreview.style.display = 'flex';
    }

    function removeFile() {
        uploadedFile = null;
        fileInput.value = '';
        fileUploadArea.querySelector('.file-upload-content').style.display = 'flex';
        filePreview.style.display = 'none';
    }

    // Form submission handling with EmailJS
    const form = document.getElementById('applicationForm');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate file upload
            if (!uploadedFile) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Please upload your resume';
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Uploading & Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            try {
                // Convert file to base64 for EmailJS
                const reader = new FileReader();
                reader.readAsDataURL(uploadedFile);

                reader.onload = async function() {
                    const base64File = reader.result.split(',')[1];

                    // Prepare template parameters
                    const templateParams = {
                        to_email: 'ganura@gmail.com',
                        from_name: document.getElementById('name').value,
                        from_email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        college: document.getElementById('college').value,
                        year: document.getElementById('year').value,
                        track: document.getElementById('track').value,
                        cgpa: document.getElementById('cgpa').value,
                        message: document.getElementById('message').value || 'N/A',
                        resume_name: uploadedFile.name,
                        resume_file: base64File
                    };

                    try {
                        // Send email via EmailJS
                        const response = await emailjs.send(
                            'YOUR_SERVICE_ID',  // Replace with your EmailJS service ID
                            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                            templateParams
                        );

                        // Success
                        formStatus.className = 'form-status success';
                        formStatus.textContent = '✓ Application submitted successfully! We will contact you soon.';
                        form.reset();
                        removeFile();

                        // Scroll to status message
                        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                        // Redirect to top of page after 3 seconds
                        setTimeout(function() {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            formStatus.style.display = 'none';
                        }, 3000);

                    } catch (error) {
                        console.error('EmailJS error:', error);
                        formStatus.className = 'form-status error';
                        formStatus.textContent = '✗ Failed to send application. Please try again.';
                    }
                };

                reader.onerror = function() {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = '✗ Failed to read file. Please try again.';
                };

            } catch (error) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Error submitting application. Please try again.';
                console.error('Submission error:', error);
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
