document.addEventListener("DOMContentLoaded", () => {
    try {
        const descriptionTitle = document.querySelector('.description_title');
        const productDescription = document.querySelector('.product_description');
        const descriptionCatagory = document.querySelector('.description_catagory');
        const descriptionRating = document.querySelector('.description_rating');
        const descriptionPrice = document.querySelector('.description_price');
        const productImages = document.querySelector('.photo img');
        async function loadProductDetails() {
            const urlParamitars = new URLSearchParams(window.location.search);
            const productId = urlParamitars.get('id');
            if (productId) {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                    const product = await response.json();
                    descriptionTitle.textContent = product.title;
                    productDescription.textContent = product.description;
                    descriptionCatagory.textContent = ` ${product.category}`;
                    descriptionRating.textContent = `Rating: ${product.rating.rate}`;
                    descriptionPrice.textContent = `Price: $${Math.ceil(product.price)}`;
                    productImages.src = product.image;
                    productImages.alt = product.title;
                } catch (error) {
                    console.log(error);
                    console.error('Error loading product details:', error);
                    // alert('Failed to load product details. Please try again.');
                }
            }
        }
        loadProductDetails()
    } catch (error) {
        console.log('Something is Wrong! Plz Try Again!')
        alertconsole.log('Something is Wrong! Plz Try Again!')
    }

    // info: Quantity Box Design 
    let plus = document.querySelector('.plus');
    let minus = document.querySelector('.minus');
    let numb = document.querySelector('.numb');
    let a = 1;
    plus.addEventListener('click', () => {
        a++;
        numb.innerHTML = a;
    });


    minus.addEventListener('click', () => {
        if (a == 1) {
            a.innerHTML = 1;
        } else {
            a--;
            numb.innerHTML = a;
        }

    })
})

