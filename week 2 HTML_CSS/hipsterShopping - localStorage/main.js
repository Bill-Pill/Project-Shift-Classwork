var viewCartButton = document.getElementsByClassName('view-cart')[0];
var shoppingCart = document.getElementsByClassName('shopping-cart')[0];
var products = document.getElementsByClassName('products')[0];
var STORAGE_ID = 'hipster-shopping';
var saveToLocalStorage = function () {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
}

var getFromLocalStorage = function () {
  return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}

var cart = getFromLocalStorage();

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

  if (e.target.classList.contains('clear-cart')) {
    var cartList = document.getElementsByClassName('cart-list')[0];
    var cartTotal = document.getElementsByClassName('total')[0]
    cartTotal.innerHTML = 0;

    while (cartList.hasChildNodes()) {
      cartList.removeChild(cartList.firstChild);
    }
    
    cart = [];
    cartTotal.innerHTML = 0;
  }
});

var renderCart = function() {
  var cartList = document.getElementsByClassName('cart-list')[0];

  while (cartList.hasChildNodes()) {
    cartList.removeChild(cartList.firstChild);
  }
  var items = '';
  var total = 0;
  var cartTotal = document.getElementsByClassName('total')[0]

  for (var i = 0; i < cart.length; i++) {
    var itemCounter = 0;

    if (items.includes(cart[i].name)){
      itemCounter += 2;
    }
      items += '<div>' + cart[i].name
        + ' ' + itemCounter + '- $' + cart[i].price + '</div>';
    
    

    total += parseInt(cart[i].price);

  }
  cartList.innerHTML = items;
  cartTotal.innerHTML = total;
  saveToLocalStorage();
}
renderCart();