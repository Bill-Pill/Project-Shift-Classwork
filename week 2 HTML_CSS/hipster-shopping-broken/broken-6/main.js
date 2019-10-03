var viewCartButton = document.getElementsByClassName('view-cart')[0];
var shoppingCart = document.getElementsByClassName('shopping-cart')[0];
var products = document.getElementsByClassName('products')[0];
var clearCartButton = document.getElementsByClassName('clear-cart')[0];

var cart = [];

viewCartButton.addEventListener('click', function () {
  if (shoppingCart.classList.contains('show')) {
    shoppingCart.className = 'shopping-cart';
  } else {
    shoppingCart.className += ' show';
  }
});

products.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    var itemName = e.target.closest('.item').getAttribute('data-name');

    var itemPrice = e.target.closest('.item').getAttribute('data-price');

    var product = {
      name: itemName,
      price: itemPrice
    };

    cart.push(product);
    renderCart();
  }
});

clearCartButton.addEventListener('click', function () {
    cart = [];
    renderCart();
});

var renderCart = function () {
    var cartList = document.getElementsByClassName('cart-list')[0];

    var items = [];

    for (var i = 0; i < cart.length; i++) {
        items += '<div>' + cart[i].name + ' - $' + cart[i].price + '</div>';
    }

    cartList.innerHTML = items;

    // Find the total div inside the shopping cart div
    var totalDiv = shoppingCart.getElementsByClassName('total')[0];
    // Calculate the total in the cart and render to total div
    totalDiv.innerHTML = cart.reduce((previousValue,currentValue)=>(previousValue+Number(currentValue.price)),0);

};