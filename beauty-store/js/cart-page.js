/**
 * ============================================
 * VELORA BEAUTY - Cart Page Logic
 * ============================================
 * Handles cart page rendering and interactions
 */

/**
 * Initialize cart page
 */
function initCartPage() {
    renderCart();
    setupMobileMenu();
    setupScrollAnimations();
}

/**
 * Render cart items and summary
 */
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cart = getCart();

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        renderEmptyCart(cartItemsContainer);
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    if (cartSummary) cartSummary.style.display = 'block';

    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';

        const subtotal = product.price * item.quantity;

        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <span class="cart-item-category">${product.category}</span>
                    <span class="cart-item-price">${formatPrice(product.price)}</span>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn-sm" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn-sm" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" aria-label="Increase quantity">+</button>
                </div>
                <div class="cart-item-subtotal">
                    <span class="subtotal-label">Subtotal</span>
                    <span class="subtotal-value">${formatPrice(subtotal)}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove ${product.name}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');

    // Render summary
    renderCartSummary();
}

/**
 * Render cart summary
 */
function renderCartSummary() {
    const summaryContainer = document.getElementById('cart-summary');
    if (!summaryContainer) return;

    const cart = getCart();
    const itemCount = getCartItemCount();
    const subtotal = getCartTotal();
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    summaryContainer.innerHTML = `
        <div class="summary-card">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row">
                <span>Items (${itemCount})</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span class="${shipping === 0 ? 'free-shipping' : ''}">${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row total">
                <span>Total</span>
                <span class="total-price">${formatPrice(total)}</span>
            </div>
            <button class="btn-checkout" onclick="showCheckoutMessage()">
                Proceed to Checkout
            </button>
            <div class="summary-note">
                ${subtotal < 50 ? `<p>Add <strong>${formatPrice(50 - subtotal)}</strong> more for free shipping!</p>` : '<p>✓ You qualify for free shipping!</p>'}
            </div>
            <a href="index.html" class="btn-continue-shopping">← Continue Shopping</a>
        </div>
    `;
}

/**
 * Render empty cart state
 * @param {HTMLElement} container - Container element
 */
function renderEmptyCart(container) {
    container.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Discover our luxury beauty collection and find your perfect products.</p>
            <a href="index.html" class="btn-shop-now">Start Shopping</a>
        </div>
    `;
}

/**
 * Show checkout message (demo functionality)
 */
function showCheckoutMessage() {
    showNotification('Checkout feature coming soon! Thank you for shopping with Veloura.', 'success');
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
document.addEventListener('DOMContentLoaded', initCartPage);
