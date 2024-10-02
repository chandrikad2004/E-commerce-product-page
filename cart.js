class ProductGallery {
    constructor(mainImageElement) {
        this.mainImageElement = mainImageElement;
        this.lightboxElement = document.getElementById('lightbox');
        this.lightboxImageElement = document.getElementById('lightboxImage');
        this.currentIndex = 0; 
    }

    changeImage(imageSrc) {
        this.mainImageElement.src = imageSrc;
    }

    openLightbox(imageSrc) {
        this.currentIndex = imageSources.indexOf(imageSrc); 
        this.lightboxImageElement.src = imageSrc;
        this.lightboxElement.classList.remove('hidden');
    }

    closeLightbox() {
        this.lightboxElement.classList.add('hidden');
    }

    changeLightboxImage(direction) {
        this.currentIndex += direction; 
        if (this.currentIndex < 0) {
            this.currentIndex = imageSources.length - 1;
        } else if (this.currentIndex >= imageSources.length) {
            this.currentIndex = 0;
        }

        this.lightboxImageElement.src = imageSources[this.currentIndex];
    }
}

// Array to hold the image sources
const imageSources = [
    "https://www.hypeelixir.com/cdn/shop/files/Untitled-1_0012s_0003_Layer836-828771.jpg?v=1712587557&width=2000",
    "https://www.hypeelixir.com/cdn/shop/files/Untitled-1_0012s_0001_Layer838-889800.jpg?v=1712587557&width=2000",
    "https://www.hypeelixir.com/cdn/shop/files/Untitled-1_0012s_0000_Layer839-396402.jpg?v=1712587557&width=2000"
];

class ShoppingCart {
    constructor() {
        this.cartItems = [];
        this.quantity = 1; 
    }

    increaseQuantity() {
        this.quantity++;
        document.getElementById('quantity').value = this.quantity; 
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
            document.getElementById('quantity').value = this.quantity; 
        }
    }

    addToCart(productName, price) {
        const existingItem = this.cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += this.quantity; 
        } else {
            // Add new item to cart
            this.cartItems.push({
                name: productName,
                price: price,
                quantity: this.quantity
            });
        }
        this.updateCartUI(); 
    }

    removeItem(productName) {
        this.cartItems = this.cartItems.filter(item => item.name !== productName); 
        this.updateCartUI(); 
    }

    getTotal() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0); 
    }

    updateCartUI() {
        const cartItemsElement = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');

        cartItemsElement.innerHTML = ''; 

        if (this.cartItems.length === 0) {
            cartItemsElement.innerHTML = '<p>Your cart is empty.</p>'; 
        } else {
            // Display each item in the cart
            this.cartItems.forEach(item => {
                cartItemsElement.innerHTML += `
                    <p>
                        ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} 
                        = $${(item.price * item.quantity).toFixed(2)}
                        <button onclick="cart.removeItem('${item.name}')">Remove</button>
                    </p>
                `;
            });
        }

        cartTotalElement.innerHTML = `Total: $${this.getTotal().toFixed(2)}`; 
    }
}

// Initialize ProductGallery and ShoppingCart
const gallery = new ProductGallery(document.getElementById('mainProductImage'));
const cart = new ShoppingCart();

// Event listeners for thumbnail clicks
const thumbnails = document.querySelectorAll('.thumbnail');
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        gallery.openLightbox(thumbnail.src); 
    });
});

// Lightbox navigation
document.querySelector('.nav-button.prev').addEventListener('click', () => gallery.changeLightboxImage(-1));
document.querySelector('.nav-button.next').addEventListener('click', () => gallery.changeLightboxImage(1));
document.querySelector('.close-button').addEventListener('click', () => gallery.closeLightbox());

// Event listener for "Add to Cart" button
document.querySelector('.add-to-cart').addEventListener('click', function() {
    cart.addToCart('Cool Sneakers', 79.99); 
});
