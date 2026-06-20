/**
 * ============================================
 * VELORA BEAUTY - Shopping Cart Logic
 * ============================================
 * Handles all cart operations using localStorage
 */

const CART_KEY = 'veloura_cart';

/**
 * Get cart from localStorage
 * @returns {Array} Cart items array
 */
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items array
 */
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

/**
 * Add product to cart
 * @param {number} productId - Product ID
 * @param {number} quantity - Quantity to add
 */
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }

    saveCart(cart);
    showNotification('Product added to cart!', 'success');
}

/**
 * Remove product from cart
 * @param {number} productId - Product ID to remove
 */
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);

    // Refresh cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

/**
 * Update product quantity in cart
 * @param {number} productId - Product ID
 * @param {number} quantity - New quantity
 */
function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = quantity;
        saveCart(cart);
    }

    // Refresh cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

/**
 * Get total item count in cart
 * @returns {number} Total items
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get cart total price
 * @returns {number} Total price
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

/**
 * Clear entire cart
 */
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();

    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

/**
 * Update cart count badge in navbar
 */
function updateCartCount() {
    const count = getCartItemCount();
    const badges = document.querySelectorAll('.cart-count');

    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

/**
 * Show notification toast
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success' or 'error'
 */
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Generate star rating HTML
 * @param {number} rating - Rating value (0-5)
 * @returns {string} HTML string
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';

    for (let i = 0; i < fullStars; i++) {
        html += '★';
    }
    if (hasHalf) {
        html += '½';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        html += '☆';
    }

    return html;
}

/**
 * Format price with currency
 * @param {number} price - Price value
 * @returns {string} Formatted price
 */
function formatPrice(price) {
    return '$' + price.toFixed(2);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
