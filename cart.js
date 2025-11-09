// Cart functionality
let cart = [];
let currentProduct = null;

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('honzq_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('honzq_cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add product to cart
function addToCart(product) {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        return;
    }

    // Check if product is sold
    if (product.status === 'sold') {
        return;
    }

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: (product.images && product.images[0]) || product.image || '',
        rotate: product.rotate || 0
    });

    saveCart();
    showCartNotification();
}

// Show cart notification
function showCartNotification() {
    // Remove any existing notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = typeof t === 'function' ? t('addedToCart') : 'Added to cart!';
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Hide and remove after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

// Calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="cart-empty">${typeof t === 'function' ? t('cartEmpty') : 'Your cart is empty'}</div>`;
        cartTotal.textContent = '0 Kč';
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;

    cartItemsContainer.innerHTML = cart.map(item => {
        const rotateStyle = item.rotate ? `style="transform: rotate(${item.rotate}deg);"` : '';
        const imageContent = item.image
            ? `<img src="${item.image}" alt="${item.name}" class="cart-item-image" ${rotateStyle}>`
            : '<div class="cart-item-image" style="display: flex; align-items: center; justify-content: center; font-size: 2rem;">👕</div>';

        return `
            <div class="cart-item">
                ${imageContent}
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} Kč</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">${typeof t === 'function' ? t('remove') : 'Remove'}</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `${calculateTotal()} Kč`;
}

// Open cart modal
function openCart() {
    const cartModal = document.getElementById('cartModal');
    renderCart();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = calculateTotal();
    const itemsList = cart.map(item => `- ${item.name}: ${item.price} Kč`).join('\n');

    const messageTemplate = typeof t === 'function' ? t('checkoutMessage') : 'Hi! I would like to order the following items:\n\n{items}\n\nTotal: {total} Kč';
    const message = messageTemplate.replace('{items}', itemsList).replace('{total}', total);
    const phoneNumber = '420792312863';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

// Setup cart event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    // Cart button click
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    // Cart modal close
    const cartModalClose = document.getElementById('cartModalClose');
    if (cartModalClose) {
        cartModalClose.addEventListener('click', closeCart);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    // Close cart modal when clicking outside
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                closeCart();
            }
        });
    }

    // Add to cart button in product modal
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (currentProduct) {
                addToCart(currentProduct);
            }
        });
    }
});

// Export function to set current product (called from script.js)
function setCurrentProduct(product) {
    currentProduct = product;

    // Update Add to Cart button state
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        if (product.status === 'sold') {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = typeof t === 'function' ? t('soldOut') : 'Sold Out';
        } else if (cart.find(item => item.id === product.id)) {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = typeof t === 'function' ? t('alreadyInCart') : 'Already in Cart';
        } else {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = typeof t === 'function' ? t('addToCart') : 'Add to Cart';
        }
    }
}
