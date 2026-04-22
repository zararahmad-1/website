// Global variables
let currentProductData = {};
let cartItems = [];

// Product data
const productData = {
    'featured': {
        title: 'Complete Digestive Wellness Formula',
        price: '$49.99',
        originalPrice: '$69.99',
        image: 'assets/herbs-collection.jpg',
        description: 'Our flagship herbal blend combines 12 powerful digestive herbs to support healthy digestion, reduce bloating, and promote gut health naturally. This carefully crafted formula has been used successfully by hundreds of patients to restore digestive balance and improve overall wellness.'
    },
    'immunity-tea': {
        title: 'Immunity Booster Tea',
        price: '$24.99',
        originalPrice: '$34.99',
        image: 'assets/herbal-jars.jpg',
        description: 'A powerful blend of immune-supporting herbs including echinacea, elderberry, and ginger. This tea helps strengthen your natural defenses and supports overall immune system health.'
    },
    'joint-oil': {
        title: 'Joint Pain Relief Oil',
        price: '$39.99',
        originalPrice: '$49.99',
        image: 'assets/herbal-jars.jpg',
        description: 'Topical herbal oil formulated with anti-inflammatory herbs like turmeric, wintergreen, and arnica. Provides natural relief for joint pain, muscle aches, and inflammation.'
    },
    'stress-capsules': {
        title: 'Stress Relief Capsules',
        price: '$29.99',
        originalPrice: '$39.99',
        image: 'assets/herbal-jars.jpg',
        description: 'Natural stress relief with adaptogenic herbs including ashwagandha, rhodiola, and holy basil. Helps manage stress, promote relaxation, and support mental clarity.'
    },
    'skin-balm': {
        title: 'Skin Healing Balm',
        price: '$19.99',
        originalPrice: '$29.99',
        image: 'assets/herbal-jars.jpg',
        description: 'Soothing herbal balm with calendula, comfrey, and aloe vera. Perfect for treating eczema, cuts, scrapes, and various skin irritations naturally.'
    },
    'sleep-tincture': {
        title: 'Sleep Support Tincture',
        price: '$34.99',
        originalPrice: '$44.99',
        image: 'assets/herbal-jars.jpg',
        description: 'Gentle herbal tincture with valerian root, passionflower, and chamomile. Promotes restful sleep and helps establish healthy sleep patterns naturally.'
    },
    'womens-formula': {
        title: "Women's Balance Formula",
        price: '$44.99',
        originalPrice: '$59.99',
        image: 'assets/herbal-jars.jpg',
        description: 'Specialized herbal formula for women\'s health featuring red clover, dong quai, and vitex. Supports hormonal balance, menstrual health, and overall feminine wellness.'
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupServiceCardHover(); // Add this line
});

// Initialize website functionality
function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupFormHandlers();
    setupModalHandlers();
    setupProductTabs();
    setupConsultationTypes();
    setupQuantityControls();
    setMinDate();
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll effects and animations
function setupScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .testimonial-card, .blog-card, .value-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form handlers
function setupFormHandlers() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }

    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Message sent successfully! We will get back to you within 24 hours.', 'success');
    e.target.reset();
}

// Handle newsletter form submission
function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    showNotification('Successfully subscribed to our newsletter!', 'success');
    e.target.reset();
}

// Handle booking form submission
function handleBookingForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Hide form and show success message
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
    
    // Auto close modal after 3 seconds
    setTimeout(() => {
        closeBookingModal();
        // Reset form for next use
        document.getElementById('bookingForm').style.display = 'block';
        document.getElementById('bookingSuccess').style.display = 'none';
        e.target.reset();
    }, 3000);
}

// Modal handlers
function setupModalHandlers() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Booking modal functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form state
        setTimeout(() => {
            document.getElementById('bookingForm').style.display = 'block';
            document.getElementById('bookingSuccess').style.display = 'none';
            document.getElementById('bookingForm').reset();
        }, 300);
    }
}

// Product modal functions
function openProductModal(productId) {
    console.log('openProductModal called with productId:', productId);
    const modal = document.getElementById('productModal');
    const product = productData[productId];
    
    if (modal && product) {
        // Update modal content
        document.getElementById('productModalTitle').textContent = product.title;
        document.getElementById('productModalPrice').textContent = product.price;
        document.getElementById('productModalOriginalPrice').textContent = product.originalPrice;
        document.getElementById('productModalImage').src = product.image;
        document.getElementById('productModalImage').alt = product.title;
        document.getElementById('productModalDescription').textContent = product.description;
        
        // Store current product data
        currentProductData = product;
        
        // Reset quantity
        document.getElementById('quantity').value = 1;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    closeBookingModal();
    closeProductModal();
}

// Product tabs functionality
function setupProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.add('active');
        });
    });
}

// Consultation type selection
function setupConsultationTypes() {
    const typeOptions = document.querySelectorAll('.type-option');
    
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            typeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update hidden input or form data as needed
            const consultationType = this.getAttribute('data-type');
            // You can store this value or use it as needed
        });
    });
}

// Quantity controls
function setupQuantityControls() {
    // Quantity controls are handled by individual functions
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.getAttribute('max')) || 10;
    
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const minValue = parseInt(quantityInput.getAttribute('min')) || 1;
    
    if (currentValue > minValue) {
        quantityInput.value = currentValue - 1;
    }
}

// Set minimum date for booking
function setMinDate() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                z-index: 1000;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #22c55e;
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            
            .notification-info {
                border-left: 4px solid #3b82f6;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
            }
            
            .notification-message {
                color: #0f172a;
                font-size: 14px;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                margin-left: 12px;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .notification-close:hover {
                background-color: #f1f5f9;
            }
            
            .notification-close svg {
                width: 16px;
                height: 16px;
                color: #64748b;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Cart functionality (basic implementation)
function addToCart(productId) {
    const product = productData[productId] || currentProductData;
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);
    
    // Add to cart array
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            id: productId,
            ...product,
            quantity: quantity
        });
    }
    
    showNotification(`${product.title} added to cart!`, 'success');
    updateCartDisplay();
}

function updateCartDisplay() {
    // Update cart count in navigation if you have a cart icon
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    // You can update a cart counter here if needed
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Form validation helpers
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            showFieldError(input, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
    
    input.parentElement.appendChild(errorElement);
    input.style.borderColor = '#ef4444';
}

function clearFieldError(input) {
    const existingError = input.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

// Enhanced form handlers with validation
function handleContactForm(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Message sent successfully! We will get back to you within 24 hours.', 'success');
    e.target.reset();
}

function handleBookingForm(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Hide form and show success message
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
    
    // Auto close modal after 3 seconds
    setTimeout(() => {
        closeBookingModal();
        // Reset form for next use
        document.getElementById('bookingForm').style.display = 'block';
        document.getElementById('bookingSuccess').style.display = 'none';
        e.target.reset();
    }, 3000);
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill for smooth scrolling
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Add hover effect to service cards, value cards, product cards, testimonial cards, and blog cards (rainbow effect for testimonials and blog)
function setupServiceCardHover() {
    // Inject CSS for hover effect if not already present
    if (!document.getElementById('service-card-hover-style')) {
        const style = document.createElement('style');
        style.id = 'service-card-hover-style';
        style.textContent = `
            .service-card, .value-card, .product-card, .blog-card {
                transition: box-shadow 0.3s, border-color 0.3s, background 0.3s;
            }
            .service-card.hover-effect,
            .service-card:hover,
            .value-card.hover-effect,
            .value-card:hover,
            .product-card.hover-effect,
            .product-card:hover,
            .testimonial-card.hover-effect,
            .testimonial-card:hover,
            .blog-card.hover-effect,
            .blog-card:hover {
                box-shadow: 0 8px 24px 0 rgba(34,197,94,0.15), 0 1.5px 6px 0 rgba(34,197,94,0.10);
                border-color: #22c55e !important;
                background: linear-gradient(105deg, #f0fdf4 60%, #bbf7d0 100%);
            }
        `;
        document.head.appendChild(style);
    }

    // Add JS hover for better mobile support and to ensure effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hover-effect'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover-effect'));
        card.addEventListener('touchstart', () => card.classList.add('hover-effect'));
        card.addEventListener('touchend', () => card.classList.remove('hover-effect'));
    });

    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hover-effect'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover-effect'));
        card.addEventListener('touchstart', () => card.classList.add('hover-effect'));
        card.addEventListener('touchend', () => card.classList.remove('hover-effect'));
    });

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hover-effect'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover-effect'));
        card.addEventListener('touchstart', () => card.classList.add('hover-effect'));
        card.addEventListener('touchend', () => card.classList.remove('hover-effect'));
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hover-effect'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover-effect'));
        card.addEventListener('touchstart', () => card.classList.add('hover-effect'));
        card.addEventListener('touchend', () => card.classList.remove('hover-effect'));
    });

    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hover-effect'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover-effect'));
        card.addEventListener('touchstart', () => card.classList.add('hover-effect'));
        card.addEventListener('touchend', () => card.classList.remove('hover-effect'));
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    smoothScrollPolyfill();
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    smoothScrollPolyfill();
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;

// Remove Add to Cart logic for modal Buy Now
// (No changes needed if you only want to remove Add to Cart from modal and not from product grid)

// Show WhatsApp message on modal Buy Now button click
function showWhatsAppMessage() {
    console.log('showWhatsAppMessage called');
    var msg = document.getElementById('whatsappMessage');
    if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
}

// Export showWhatsAppMessage for global access
window.showWhatsAppMessage = showWhatsAppMessage;
