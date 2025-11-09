// Language translations
const translations = {
    en: {
        tagline: "Curated vintage pieces for the modern wardrobe",
        filterAll: "All",
        filterTops: "Tops",
        filterBottoms: "Bottoms",
        filterOuterwear: "Outerwear",
        filterAccessories: "Accessories",
        available: "AVAILABLE",
        soldOut: "SOLD OUT",
        aboutTitle: "About Us",
        aboutText: "Welcome to honzq.vintage - your destination for unique, hand-picked vintage streetwear. We specialize in curating rare and authentic pieces from iconic brands like Supreme, Bape, and other premium labels. Each item is carefully selected to bring you the best quality vintage fashion at affordable prices. Based in Jesenice, Czech Republic, we're passionate about sustainable fashion and giving timeless pieces a second life.",
        contactTitle: "GET IN TOUCH",
        contactPhone: "Phone",
        contactEmail: "Email",
        contactInstagram: "Instagram",
        footer: "© 2025 honzq.vintage. All rights reserved.",
        description: "Description",
        noDescription: "No description available.",
        addToCart: "Add to Cart",
        alreadyInCart: "Already in Cart",
        cartTitle: "Your Cart",
        cartEmpty: "Your cart is empty",
        total: "Total:",
        proceedToCheckout: "Proceed to Checkout",
        remove: "Remove",
        addedToCart: "Added to cart!",
        checkoutMessage: "Hi! I would like to order the following items:\n\n{items}\n\nTotal: {total} Kč"
    },
    cz: {
        tagline: "Vybrané vintage kousky pro moderní šatník",
        filterAll: "Vše",
        filterTops: "Trička",
        filterBottoms: "Kalhoty",
        filterOuterwear: "Bundy",
        filterAccessories: "Doplňky",
        available: "K DISPOZICI",
        soldOut: "VYPRODÁNO",
        aboutTitle: "O nás",
        aboutText: "Vítejte na honzq.vintage - vaší destinaci pro jedinečné, ručně vybrané vintage streetwear kousky. Specializujeme se na kurátorování vzácných a autentických kusů od ikonických značek jako Supreme, Bape a dalších prémiových labelů. Každý kousek je pečlivě vybrán, abychom vám přinesli tu nejlepší kvalitu vintage módy za dostupné ceny. Nacházíme se v Jesenici v České republice a jsme nadšení pro udržitelnou módu a dáváme nadčasovým kouskům druhý život.",
        contactTitle: "KONTAKTUJTE NÁS",
        contactPhone: "Telefon",
        contactEmail: "Email",
        contactInstagram: "Instagram",
        footer: "© 2025 honzq.vintage. Všechna práva vyhrazena.",
        description: "Popis",
        noDescription: "Popis není k dispozici.",
        addToCart: "Přidat do košíku",
        alreadyInCart: "Již v košíku",
        cartTitle: "Váš košík",
        cartEmpty: "Váš košík je prázdný",
        total: "Celkem:",
        proceedToCheckout: "Přejít k objednávce",
        remove: "Odebrat",
        addedToCart: "Přidáno do košíku!",
        checkoutMessage: "Ahoj! Chtěl bych objednat následující položky:\n\n{items}\n\nCelkem: {total} Kč"
    }
};

// Current language (default Czech)
let currentLanguage = localStorage.getItem('honzq_language') || 'cz';

// Get translation
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Update all text on page
function updateLanguage() {
    // Update tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) tagline.textContent = t('tagline');

    // Update filter buttons
    const filterButtons = {
        'all': t('filterAll'),
        'tops': t('filterTops'),
        'bottoms': t('filterBottoms'),
        'outerwear': t('filterOuterwear'),
        'accessories': t('filterAccessories')
    };

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filter = btn.dataset.filter;
        if (filterButtons[filter]) {
            btn.textContent = filterButtons[filter];
        }
    });

    // Update about section
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) aboutTitle.textContent = t('aboutTitle');

    const aboutText = document.getElementById('aboutText');
    if (aboutText) aboutText.textContent = t('aboutText');

    // Update contact section
    const contactTitle = document.querySelector('.contact-title');
    if (contactTitle) contactTitle.textContent = t('contactTitle');

    const contactLabels = document.querySelectorAll('.contact-label');
    if (contactLabels[0]) contactLabels[0].textContent = t('contactPhone');
    if (contactLabels[1]) contactLabels[1].textContent = t('contactEmail');
    if (contactLabels[2]) contactLabels[2].textContent = t('contactInstagram');

    // Update footer
    const footer = document.querySelector('footer p');
    if (footer) footer.textContent = t('footer');

    // Update modal description header
    const modalDescTitle = document.querySelector('.modal-description h3');
    if (modalDescTitle) modalDescTitle.textContent = t('description');

    // Update cart modal
    const cartTitle = document.querySelector('.cart-title');
    if (cartTitle) cartTitle.textContent = t('cartTitle');

    const totalLabel = document.querySelector('.cart-total span:first-child');
    if (totalLabel) totalLabel.textContent = t('total');

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.textContent = t('proceedToCheckout');

    // Update language button
    const langText = document.getElementById('langText');
    if (langText) langText.textContent = currentLanguage === 'cz' ? 'EN' : 'CZ';

    // Re-render products to update status text
    if (typeof renderProducts === 'function' && typeof products !== 'undefined') {
        const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
        renderProducts(filtered);
    }

    // Update cart if open
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'cz' : 'en';
    localStorage.setItem('honzq_language', currentLanguage);
    updateLanguage();
}

// Setup language button
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }

    // Initial language setup
    updateLanguage();
});
