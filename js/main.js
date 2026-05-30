// SoftServe Internship Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

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

    // Form submission handling with Cloudinary + FormSpree
    const form = document.getElementById('applicationForm');
    const formStatus = document.getElementById('formStatus');

    // Cloudinary configuration (replace these with your values after setup)
    const CLOUDINARY_CLOUD_NAME = 'dmsqoncw5'; // Replace with your cloud name
    const CLOUDINARY_UPLOAD_PRESET = 'softserve_internships'; // Replace with your upload preset

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate file upload
            if (!uploadedFile) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Please upload your resume';
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Uploading resume...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            try {
                // Step 1: Upload file to Cloudinary
                const cloudinaryFormData = new FormData();
                cloudinaryFormData.append('file', uploadedFile);
                cloudinaryFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                submitButton.textContent = 'Uploading to cloud...';

                const cloudinaryResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
                    {
                        method: 'POST',
                        body: cloudinaryFormData
                    }
                );

                if (!cloudinaryResponse.ok) {
                    throw new Error('Failed to upload resume to cloud storage');
                }

                const cloudinaryData = await cloudinaryResponse.json();
                const resumeUrl = cloudinaryData.secure_url;

                // Step 2: Submit form data with resume URL to FormSpree
                submitButton.textContent = 'Sending application...';

                const formData = new FormData();
                formData.append('name', document.getElementById('name').value);
                formData.append('email', document.getElementById('email').value);
                formData.append('phone', document.getElementById('phone').value);
                formData.append('college', document.getElementById('college').value);
                formData.append('year', document.getElementById('year').value);
                formData.append('track', document.getElementById('track').value);
                formData.append('cgpa', document.getElementById('cgpa').value);
                formData.append('message', document.getElementById('message').value || 'N/A');
                formData.append('resume_url', resumeUrl);
                formData.append('resume_filename', uploadedFile.name);

                const formspreeResponse = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (formspreeResponse.ok) {
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
                } else {
                    // Error from FormSpree
                    const data = await formspreeResponse.json();
                    formStatus.className = 'form-status error';
                    formStatus.textContent = '✗ ' + (data.error || 'Failed to send application. Please try again.');
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } catch (error) {
                // Network or upload error
                formStatus.className = 'form-status error';
                if (error.message.includes('cloud storage')) {
                    formStatus.textContent = '✗ Failed to upload resume. Please check your file and try again.';
                } else {
                    formStatus.textContent = '✗ Error submitting application. Please try again.';
                }
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
