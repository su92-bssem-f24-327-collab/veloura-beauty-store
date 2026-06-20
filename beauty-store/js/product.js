/**
 * ============================================
 * VELORA BEAUTY - Product Detail Page Logic
 * ============================================
 * Handles product detail loading and quantity selection
 */

let currentProduct = null;
let currentQuantity = 1;

/**
 * Initialize product detail page
 */
function initProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId || isNaN(productId)) {
        showProductError();
        return;
    }

    currentProduct = products.find(p => p.id === productId);

    if (!currentProduct) {
        showProductError();
        return;
    }

    renderProductDetail();
    setupQuantityControls();
    setupMobileMenu();
    setupScrollAnimations();
}

/**
 * Render product detail content
 */
function renderProductDetail() {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    container.innerHTML = `
        <div class="product-detail-wrapper">
            <div class="product-detail-image-section">
                <div class="product-detail-image-wrapper">
                    <img src="${currentProduct.image}" alt="${currentProduct.name}" class="product-detail-image" id="product-detail-img">
                </div>
            </div>
            <div class="product-detail-info-section">
                <span class="product-detail-category">${currentProduct.category}</span>
                <h1 class="product-detail-name">${currentProduct.name}</h1>
                <div class="product-detail-rating">
                    <span class="stars">${generateStars(currentProduct.rating)}</span>
                    <span class="rating-text">${currentProduct.rating} out of 5</span>
                    <span class="rating-count">(128 reviews)</span>
                </div>
                <div class="product-detail-price">${formatPrice(currentProduct.price)}</div>
                <div class="product-detail-description">
                    <p>${currentProduct.description}</p>
                </div>

                <div class="product-detail-features">
                    <div class="feature-item">
                        <span class="feature-icon">✓</span>
                        <span>Cruelty-Free</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">✓</span>
                        <span>Paraben-Free</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">✓</span>
                        <span>Premium Quality</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">✓</span>
                        <span>Free Shipping $50+</span>
                    </div>
                </div>

                <div class="product-detail-quantity">
                    <label for="quantity">Quantity</label>
                    <div class="quantity-selector">
                        <button class="qty-btn" id="qty-minus" aria-label="Decrease quantity">−</button>
                        <input type="number" id="quantity" value="1" min="1" max="10" readonly>
                        <button class="qty-btn" id="qty-plus" aria-label="Increase quantity">+</button>
                    </div>
                </div>

                <div class="product-detail-actions">
                    <button class="btn-add-cart-large" id="add-to-cart-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                    </button>
                </div>

                <div class="product-detail-meta">
                    <div class="meta-item">
                        <span class="meta-label">SKU:</span>
                        <span class="meta-value">VLB-${String(currentProduct.id).padStart(4, '0')}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Category:</span>
                        <span class="meta-value">${currentProduct.category}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup add to cart button
    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            addToCart(currentProduct.id, currentQuantity);
        });
    }
}

/**
 * Setup quantity selector controls
 */
function setupQuantityControls() {
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const quantityInput = document.getElementById('quantity');

    if (minusBtn) {
        minusBtn.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityInput.value = currentQuantity;
            }
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', () => {
            if (currentQuantity < 10) {
                currentQuantity++;
                quantityInput.value = currentQuantity;
            }
        });
    }
}

/**
 * Show error when product not found
 */
function showProductError() {
    const container = document.getElementById('product-detail-container');
    if (container) {
        container.innerHTML = `
            <div class="product-error">
                <div class="error-icon">⚠</div>
                <h2>Product Not Found</h2>
                <p>Sorry, we couldn't find the product you're looking for.</p>
                <a href="index.html" class="btn-back">Back to Shop</a>
            </div>
        `;
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
        });
    }
}

/**
 * Setup scroll animations
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

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initProductDetail);
