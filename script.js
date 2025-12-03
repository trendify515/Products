document.addEventListener('DOMContentLoaded', function() {
    // Product data array
    const products = [
        {
            id: 1,
            title: "Wireless Bluetooth Earbuds Pro",
            description: "Noise cancelling, 30hr battery, water resistant with premium sound quality.",
            price: 89.99,
            originalPrice: 129.99,
            link: "https://example.com/wireless-bluetooth-earbuds-pro",
            rating: 4.8,
            category: "electronics",
            badge: "TRENDING",
            inStock: true,
            onSale: true
        },
        {
            id: 2,
            title: "Smart Fitness Watch Series 5",
            description: "Track heart rate, sleep, and workouts with GPS and 7-day battery life.",
            price: 199.99,
            originalPrice: null,
            link: "https://example.com/smart-fitness-watch-series-5",
            rating: 4.6,
            category: "electronics",
            badge: "NEW",
            inStock: true,
            onSale: false
        },
        {
            id: 3,
            title: "Organic Cotton T-Shirt (Pack of 3)",
            description: "Eco-friendly, breathable fabric with premium fit and comfort.",
            price: 34.99,
            originalPrice: 49.99,
            link:  "https://example.com/organic-cotton-tshirt-pack-of-3",
            rating: 4.5,
            category: "fashion",
            badge: "SALE",
            inStock: true,
            onSale: true
        },
        {
            id: 4,
            title: "Portable Power Bank 20,000mAh",
            description: "Fast charging for multiple devices, compact design with LED indicator.",
            price: 39.99,
            originalPrice: 59.99,
            link: "https://example.com/portable-power-bank-20000mah",
            rating: 4.7,
            category: "electronics",
            badge: null,
            inStock: true,
            onSale: true
        },
        {
            id: 5,
            title: "Gaming Keyboard Mechanical",
            description: "RGB backlit, programmable keys, ergonomic design for gaming.",
            price: 79.99,
            originalPrice: null,
            link: "https://example.com/gaming-keyboard-mechanical",
            rating: 4.9,
            category: "electronics",
            badge: "BESTSELLER",
            inStock: false,
            onSale: false
        },
        {
            id: 6,
            title: "Yoga Mat Premium 10mm",
            description: "Non-slip, eco-friendly material with carrying strap included.",
            price: 29.99,
            originalPrice: 44.99,
            link: "https://example.com/yoga-mat-premium-10mm",
            rating: 4.4,
            category: "sports",
            badge: "SALE",
            inStock: true,
            onSale: true
        },
        {
            id: 7,
            title: "Ceramic Coffee Mug Set",
            description: "Set of 4 handcrafted mugs, dishwasher and microwave safe.",
            price: 24.99,
            originalPrice: null,
            link: "https://example.com/ceramic-coffee-mug-set",
            rating: 4.3,
            category: "home",
            badge: null,
            inStock: true,
            onSale: false
        },
        {
            id: 8,
            title: "Wireless Charging Pad",
            description: "Fast 15W charging for all Qi-enabled devices, slim design.",
            price: 19.99,
            originalPrice: 29.99,
            rating: 4.6,
            category: "electronics",
            badge: "NEW",
            inStock: true,
            onSale: true
        }
    ];

    // Cart and Wishlist data
    let cart = [];
    let wishlist = [];
    let cartCount = 0;
    let wishlistCount = 0;

    // DOM Elements
    const cartCountElements = document.querySelectorAll('.cart-count');
    const wishlistCountElement = document.querySelectorAll('.cart-count')[0];
    const productsContainer = document.querySelector('.products-container');
    const productsCountElement = document.querySelector('.products-count');
    const searchInput = document.querySelector('.search-box input');
    const sortSelect = document.querySelector('.sort-select');
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const filterRadios = document.querySelectorAll('.filter-option input[type="radio"]');
    const priceRange = document.querySelector('.price-range');
    const priceValues = document.querySelector('.price-values');
    const viewButtons = document.querySelectorAll('.view-btn');
    const pageButtons = document.querySelectorAll('.page-btn');
    const bannerButton = document.querySelector('.banner-button');

    // Initialize the page
    function init() {
        updateCartDisplay();
        renderProducts(products);
        setupEventListeners();
        updateProductCount();
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', handleSearch);
        
        // Sort functionality
        sortSelect.addEventListener('change', handleSort);
        
        // // Filter functionality
        // filterCheckboxes.forEach(checkbox => {
        //     checkbox.addEventListener('change', handleFilter);
        // });
        
        filterRadios.forEach(radio => {
            radio.addEventListener('change', handleFilter);
        });
        
        // Price range
        priceRange.addEventListener('input', handlePriceRange);
        
        // View toggle
        viewButtons.forEach(button => {
            button.addEventListener('click', handleViewToggle);
        });
        
        // Page navigation
        pageButtons.forEach(button => {
            button.addEventListener('click', handlePagination);
        });
        
        // Banner button
        bannerButton.addEventListener('click', handleBannerClick);
        
        // Nav icons functionality
        setupNavIcons();
    }

    // Setup navigation icons
    function setupNavIcons() {
        const navIcons = document.querySelectorAll('.nav-icon');
        
        navIcons[0].addEventListener('click', () => { // Search icon
            searchInput.focus();
        });
        
        navIcons[1].addEventListener('click', () => { // Heart icon
            toggleWishlistView();
        });
        
        navIcons[2].addEventListener('click', () => { // Cart icon
            toggleCartView();
        });
        
        navIcons[3].addEventListener('click', () => { // User icon
            showUserModal();
        });
    }

    // Render products to the DOM
    function renderProducts(productsToRender) {
        productsContainer.innerHTML = '';
        
        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
        
        // Re-attach event listeners to new buttons
        attachProductButtonListeners();
        updateProductCount(productsToRender.length);
    }

    // Create product card HTML
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.dataset.category = product.category;
        card.dataset.price = product.price;
        card.dataset.rating = product.rating;
        card.dataset.inStock = product.inStock;
        card.dataset.onSale = product.onSale;
        card.dataset.link = product.link;
        
        const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        const originalPriceHTML = product.originalPrice ? 
            `<span class="original-price">$${product.originalPrice}</span>` : '';
        
        card.innerHTML = `
            ${badgeHTML}
            <div class="product-image"></div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price"></div>
                <div class="product-footer">
                    <div class="rating">
                        <i class="fas fa-star"></i> ${product.rating}
                    </div>
                    <a style="text-decoration: none; color: #fff;" href="${product.link}"><button class="buy-button" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button></a>
                </div>
            </div>
        `;
        
        return card;
    }

    // Attach event listeners to product buttons
    function attachProductButtonListeners() {
        const buyButtons = document.querySelectorAll('.buy-button');
        
        buyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = parseInt(this.dataset.id);
                addToCart(productId);
                
                // Animation feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Make whole card clickable for product details
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.buy-button')) {
                    const productId = parseInt(this.dataset.id);
                    showProductDetails(productId);
                }
            });
        });
    }

    // // Add product to cart
    // function addToCart(productId) {
    //     const product = products.find(p => p.id === productId);
        
    //     if (!product) return;
        
    //     const existingItem = cart.find(item => item.id === productId);
        
    //     if (existingItem) {
    //         existingItem.quantity++;
    //     } else {
    //         cart.push({
    //             ...product,
    //             quantity: 1
    //         });
    //     }
        
    //     cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    //     updateCartDisplay();
    //     showNotification(`Added "${product.title}" to cart`);
    //     saveToLocalStorage();
    // }

    // Update cart display
    function updateCartDisplay() {
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
        });
    }

    // Handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderProducts(getFilteredProducts());
            return;
        }
        
        const filtered = getFilteredProducts().filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        renderProducts(filtered);
    }

    // Handle sorting
    function handleSort() {
        const sortValue = sortSelect.value;
        let sortedProducts = [...getFilteredProducts()];
        
        switch(sortValue) {
            case 'Price: Low to High':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'Highest Rated':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'Newest Arrivals':
                // Assuming newer products have higher IDs
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
            default: // Recommended
                // Keep original order
                break;
        }
        
        renderProducts(sortedProducts);
    }

    // Handle filtering
    function handleFilter() {
        renderProducts(getFilteredProducts());
    }

    // Get filtered products based on all filters
    function getFilteredProducts() {
        let filtered = [...products];
        
        // Category filter
        const selectedCategories = Array.from(
            document.querySelectorAll('.filter-option input[type="checkbox"]:checked')
        ).map(cb => cb.id);
        
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => 
                selectedCategories.includes(product.category)
            );
        }
        
        // Price filter
        const maxPrice = parseInt(priceRange.value);
        filtered = filtered.filter(product => product.price <= maxPrice);
        
        // Rating filter
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating) {
            const minRating = parseInt(selectedRating.id.replace('rating', ''));
            filtered = filtered.filter(product => product.rating >= minRating);
        }
        
        // Availability filters
        const inStockChecked = document.getElementById('inStock').checked;
        const onSaleChecked = document.getElementById('onSale').checked;
        
        if (inStockChecked) {
            filtered = filtered.filter(product => product.inStock);
        }
        
        if (onSaleChecked) {
            filtered = filtered.filter(product => product.onSale);
        }
        
        return filtered;
    }

    // Handle price range
    function handlePriceRange() {
        const value = this.value;
        priceValues.children[1].textContent = `$${value}`;
        handleFilter();
    }

    // Handle view toggle
    function handleViewToggle() {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (this.querySelector('.fa-list')) {
            productsContainer.style.gridTemplateColumns = '1fr';
        } else {
            productsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    }

    // Handle pagination
    function handlePagination() {
        if (this.classList.contains('active')) return;
        
        pageButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // In a real app, this would load more products
        // For demo, we'll just show a notification
        const pageNum = this.textContent.trim();
        if (!['<', '>'].includes(pageNum)) {
            showNotification(`Loading page ${pageNum}...`);
        }
    }

    // Handle banner click
    function handleBannerClick() {
        // Filter to show only sale items
        document.getElementById('onSale').checked = true;
        handleFilter();
        showNotification('Showing all sale items!');
    }

    // Update product count
    function updateProductCount(count) {
        const totalCount = count || getFilteredProducts().length;
        productsCountElement.textContent = `Showing ${totalCount} of ${products.length} products`;
    }

    // Show product details (simulated)
    function showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            showNotification(`Viewing details for: ${product.title}`);
            // In a real app, this would open a modal or navigate to product page
        }
    }

    // Toggle wishlist view (simulated)
    function toggleWishlistView() {
        showNotification('Opening wishlist...');
        // In a real app, this would show wishlist items
    }

    // Toggle cart view (simulated)
    function toggleCartView() {
        if (cart.length === 0) {
            showNotification('Your cart is empty');
        } else {
            const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
            showNotification(`Cart: ${itemCount} items, Total: $${calculateCartTotal().toFixed(2)}`);
        }
    }

    // Calculate cart total
    function calculateCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Show user modal (simulated)
    function showUserModal() {
        showNotification('Opening account settings...');
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add CSS for notification animation
    function addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Save to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartCount', cartCount.toString());
    }

    // Load from localStorage
    function loadFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        const savedCount = localStorage.getItem('cartCount');
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        
        if (savedCount) {
            cartCount = parseInt(savedCount);
        }
    }

    // Initialize the application
    loadFromLocalStorage();
    addNotificationStyles();
    init();
});