document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    showSkeletonLoading();
    fetchProducts();
    setupEventListeners();

    async function fetchProducts() {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=10');
            if (!response.ok) throw new Error('Gagal memuat produk');
            const { products } = await response.json();
            
            setTimeout(() => {
                renderProducts(products);
            }, 1500);
            
        } catch (error) {
            showError(error.message);
        }
    }

    function renderProducts(products) {
        productContainer.innerHTML = products.map((product, index) => `
            <div class="product-card" style="animation-delay: ${index * 50}ms">
                <div class="product-image-container">
                    <img src="${product.thumbnail}" 
                        class="product-image"
                        alt="${product.title}"
                        loading="lazy">
                </div>
                <div class="product-brand">${product.brand || ''}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <span class="rating-stars">
                        ${'★'.repeat(Math.round(product.rating))}
                        ${'☆'.repeat(5 - Math.round(product.rating))}
                    </span>
                    <span>(${product.rating}/5)</span>
                </div>
                <p class="product-price">$${product.price}</p>
                <p class="product-description">${product.description}</p>
            </div>
        `).join('');
    }

    function showSkeletonLoading() {
        productContainer.innerHTML = Array(4).fill(`
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-text short"></div>
                <div class="skeleton-text" style="width: 80%"></div>
                <div class="skeleton-text medium"></div>
                <div class="skeleton-text" style="width: 50%"></div>
            </div>
        `).join('');
    }

    function showError(message) {
        productContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Gagal Memuat Produk</h3>
                <p>${message}</p>
                <button onclick="location.reload()">Coba Lagi</button>
            </div>
        `;
    }

    function setupEventListeners() {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
            }
        });
    }
});