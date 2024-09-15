const divConteiner = document.getElementById('all_Product_list');
let shopNowButton = document.querySelectorAll('.shop_btn');
async function fetchData() {
  const fetchData = await fetch('https://fakestoreapi.com/products/')
  const products = await fetchData.json()
  // console.log(products)
  products.forEach((product, index) => {
    createProductDiv(product)
  })
}
fetchData()

function createProductDiv(pd) {
  const productTemp = `
              <div class="products_item">
              <div class="imgs">
                <img src="${pd.image}" />
              </div>
              <a href="description.html?id=${pd.id}" class="product_a"> <h3 class="title">${pd.title}</h3></a>
              <p class="catagory">${pd.category}</p>
              <p class="rating">Rating: <span>${pd.rating.rate}</span></p>
              <h4 class="price">Price: $${Math.ceil(pd.price)}</h4>
              <button class="cart_btn">Add To Cart</button>
            </div>
  `;

  const createDiv = document.createElement('div');
  createDiv.innerHTML = productTemp;
  divConteiner.appendChild(createDiv);
  console.clear()
}



// info: Smooth Scroll
shopNowButton.forEach(e => e.addEventListener('click', () => {
  document.getElementsByClassName('featured_products')[0].scrollIntoView({
    behavior: 'smooth'
  });
}));

