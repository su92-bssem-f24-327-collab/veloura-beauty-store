/**
 * ============================================
 * VELORA BEAUTY - Main Page Logic
 * ============================================
 * Handles product listing, filtering, sorting, and search
 */

let currentProducts = [...products];
let currentCategory = 'All';
let currentSort = 'default';
let searchQuery = '';

/**
 * Initialize the product listing page
 */
function initProductListing() {
    renderProducts();
    setupEventListeners();
    setupAnnouncementBar();
    setupMobileMenu();
    setupScrollAnimations();
}

/**
 * Render products to the grid
 */
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    // Filter and sort products
    let filtered = filterProducts();
    filtered = sortProducts(filtered);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');

    // Add staggered animation
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

/**
 * Create product card HTML
 * @param {Object} product - Product object
 * @returns {string} HTML string
 */
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <a href="product.html?id=${product.id}" class="product-card-link">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    <div class="product-overlay">
                        <span class="view-product">View Product</span>
                    </div>
                </div>
            </a>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-value">${product.rating}</span>
                </div>
                <div class="product-price-row">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart-btn" onclick="event.preventDefault(); addToCart(${product.id}, 1);" aria-label="Add ${product.name} to cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Filter products based on category and search
 * @returns {Array} Filtered products
 */
function filterProducts() {
    let filtered = [...products];

    // Category filter
    if (currentCategory !== 'All') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    return filtered;
}

/**
 * Sort products based on current sort option
 * @param {Array} productsToSort - Products to sort
 * @returns {Array} Sorted products
 */
function sortProducts(productsToSort) {
    const sorted = [...productsToSort];

    switch (currentSort) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        default:
            // Default order (by ID)
            sorted.sort((a, b) => a.id - b.id);
    }

    return sorted;
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Category filter
    const categorySelect = document.getElementById('category-filter');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            renderProducts();
        });
    }

    // Sort filter
    const sortSelect = document.getElementById('sort-filter');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }
}

/**
 * Setup announcement bar sliding animation
 */
function setupAnnouncementBar() {
    const bar = document.querySelector('.announcement-bar');
    if (!bar) return;

    const messages = bar.querySelectorAll('.announcement-message');
    let currentIndex = 0;

    if (messages.length > 1) {
        setInterval(() => {
            messages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % messages.length;
            messages[currentIndex].classList.add('active');
        }, 4000);
    }
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
}

/**
 * Setup scroll animations using Intersection Observer
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initProductListing);
