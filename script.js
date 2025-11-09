// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');

let currentFilter = 'all';

// Initialize the page
function init() {
    renderProducts(products);
    setupFilterButtons();
    setupModal();
}

// Setup filter button event listeners
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update current filter and render
            currentFilter = button.dataset.filter;
            filterProducts();
        });
    });
}

// Filter products based on selected category
function filterProducts() {
    if (currentFilter === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(product => product.category === currentFilter);
        renderProducts(filtered);
    }
}

// Render products to the grid
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #666;">No products found in this category.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Use first image from images array, or fallback to old image property
    const firstImage = (product.images && product.images[0]) || product.image;
    const rotateStyle = product.rotate ? `style="transform: rotate(${product.rotate}deg);"` : '';
    const imageContent = firstImage
        ? `<img src="${firstImage}" alt="${product.name}" ${rotateStyle} loading="lazy">`
        : '<div class="product-placeholder">👕</div>';

    const statusClass = product.status === 'sold' ? 'sold' : 'available';
    const statusText = product.status === 'sold' ? (typeof t === 'function' ? t('soldOut') : 'SOLD OUT') : (typeof t === 'function' ? t('available') : 'AVAILABLE');

    card.innerHTML = `
        <div class="product-image">
            ${imageContent}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-price">${product.price} Kč</p>
            <div class="product-status ${statusClass}">${statusText}</div>
        </div>
    `;

    // Add click event to open modal
    card.addEventListener('click', () => openModal(product));

    return card;
}

// Setup modal event listeners
function setupModal() {
    // Close modal when clicking X
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Open modal with product details
function openModal(product) {
    // Set product name
    document.getElementById('modalProductName').textContent = product.name;

    // Set category
    document.getElementById('modalProductCategory').textContent = product.category.toUpperCase();

    // Set price
    document.getElementById('modalProductPrice').textContent = `${product.price} Kč`;

    // Set description
    const description = typeof product.description === 'object'
        ? (product.description[currentLanguage] || product.description.cz || product.description.en)
        : product.description;
    document.getElementById('modalProductDescription').textContent = description || (typeof t === 'function' ? t('noDescription') : 'No description available.');

    // Set status
    const modalStatus = document.getElementById('modalProductStatus');
    const statusClass = product.status === 'sold' ? 'sold' : 'available';
    const statusText = product.status === 'sold' ? (typeof t === 'function' ? t('soldOut') : 'SOLD OUT') : (typeof t === 'function' ? t('available') : 'AVAILABLE');
    modalStatus.className = `modal-product-status ${statusClass}`;
    modalStatus.textContent = statusText;

    // Setup image gallery
    setupImageGallery(product);

    // Set current product for cart (if cart.js is loaded)
    if (typeof setCurrentProduct === 'function') {
        setCurrentProduct(product);
    }

    // Show modal with smooth transition
    modal.style.display = 'block';
    // Force reflow for transition to work
    modal.offsetHeight;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
}

// Setup image gallery in modal
function setupImageGallery(product) {
    const mainImageContainer = document.querySelector('.main-image-container');
    const thumbnailContainer = document.getElementById('thumbnailContainer');

    // Get images array or use single image
    const images = product.images || [product.image];
    const validImages = images.filter(img => img && img.trim() !== '');

    // Get rotation style if specified
    const rotateStyle = product.rotate ? `style="transform: rotate(${product.rotate}deg);"` : '';

    // Clear thumbnails
    thumbnailContainer.innerHTML = '';

    if (validImages.length === 0) {
        // No images - show placeholder
        mainImageContainer.innerHTML = '<div class="product-placeholder" style="font-size: 5rem;">👕</div>';
        return;
    }

    // Set first image as main - recreate img element with rotation
    mainImageContainer.innerHTML = `<img id="modalMainImage" src="${validImages[0]}" alt="${product.name}" ${rotateStyle} loading="eager">`;

    // Create thumbnails if there are multiple images
    if (validImages.length > 1) {
        validImages.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;

            if (imgSrc && imgSrc.trim() !== '') {
                thumbnail.innerHTML = `<img src="${imgSrc}" alt="${product.name} ${index + 1}" ${rotateStyle} loading="lazy">`;
            } else {
                thumbnail.innerHTML = '<div class="thumbnail-placeholder">👕</div>';
            }

            thumbnail.addEventListener('click', () => {
                // Update main image
                const mainImage = document.getElementById('modalMainImage');
                if (mainImage) {
                    mainImage.src = imgSrc;
                } else {
                    mainImageContainer.innerHTML = `<img id="modalMainImage" src="${imgSrc}" alt="${product.name}" ${rotateStyle} loading="eager">`;
                }

                // Update active thumbnail
                thumbnailContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    }
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
    // Wait for transition to complete before hiding
    setTimeout(() => {
        if (!modal.classList.contains('active')) {
            modal.style.display = 'none';
        }
    }, 300);
}

// Scroll to About section
function scrollToAbout() {
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();

    // Setup About button
    const aboutBtn = document.getElementById('aboutBtn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', scrollToAbout);
    }
});
