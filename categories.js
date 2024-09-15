const parentDiv = document.querySelector("#category_product_page_content");

async function fetchDataForCategory() {
    const fetchData = await fetch('https://fakestoreapi.com/products/categories');
    const result = await fetchData.json()
    result.forEach((product, index) => {
        createCategoryList(product)
    });
}

fetchDataForCategory()

function createCategoryList(pd) {
    const categoryTemp = `<div>
                        <a href="#" class="category_link">${pd}</a>
                        </div>`;
    const categoryBody = document.getElementById('category_body_div');
    const createDivForCategory = document.createElement('div');
    createDivForCategory.classList.add('single_div_a');
    createDivForCategory.innerHTML = categoryTemp;
    categoryBody.appendChild(createDivForCategory);

    //add Event Listener for all buttons
    const link = createDivForCategory.querySelector('.category_link');
    link.addEventListener('click', function (event) {
        event.preventDefault();
        redirectToCategoryProductPage(pd);
    })
}

function redirectToCategoryProductPage(category) {
    const encodedCategory = encodeURIComponent(category);
    window.location.href = `category_product_page.html?category=${encodedCategory}`;
}

function getCategoryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

async function fetchProductsForCategory(category) {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    try {
        const response = await fetch(url);
        const products = await response.json();
        displayProductsForCategory(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProductsForCategory(products) {
    const parentDiv = document.querySelector("#category_product_page_content");
    parentDiv.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        createDivForCategoryProduct(product, parentDiv);
    });
}

function createDivForCategoryProduct(product, parentDiv) {
    const template = `
        <div class="single_product">
            <div class="imgs2">
                <img src="${product.image}" alt="${product.title}" />
            </div>
            <a href="#" class="product_a" data-product-id="${product.id}"><h3 class="category_title">${product.title}</h3></a>
            <p class="catagory2">${product.category}</p>
            <p class="rating2">Rating: <span>${Math.ceil(product.rating.rate)}</span></p>
            <h4 class="price3">Price: $${product.price}</h4>
            <button class="cart_btn category_cart">Add To Cart</button>
        </div>
    `;

    const createDiv = document.createElement('div');
    createDiv.innerHTML = template;
    parentDiv.appendChild(createDiv);

    // Add event listener to the product title link
    const productLink = createDiv.querySelector('.product_a');
    productLink.addEventListener('click', function (event) {
        event.preventDefault();
        const productId = this.getAttribute('data-product-id');
        redirectToDescriptionPage(productId);
    });
}

function redirectToDescriptionPage(productId) {
    window.location.href = `description.html?id=${productId}`;
}

// This function will be called when category_product_page.html loads
function initCategoryProductPage() {
    const category = getCategoryFromUrl();
    if (category) {
        fetchProductsForCategory(category);
    }
}

// If we're on the category product page, initialize it
if (window.location.pathname.includes('category_product_page.html')) {
    initCategoryProductPage();
}