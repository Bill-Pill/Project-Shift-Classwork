let { expect } = require("chai");
let ShoppingCart = require("./shopping-cart");

describe("The shopping cart", () => {
  describe("subtotal should", () => {
    it("be 0 if no items are passed in", () => {
      // arrange
      let shoppingCart = new ShoppingCart();
      // act
      let subtotal = shoppingCart.subtotal;
      // assert
      expect(subtotal).to.equal(0);
    });

    it("be the sum of price * quantity for all items", () => {
      //arrange
      let shoppingCart = new ShoppingCart([
        //act
        {
          id: 1,
          quantity: 5,
          price: 5
        },
        {
          id: 2,
          quantity: 4,
          price: 5
        },
        {
          id: 3,
          quantity: 1,
          price: 50
        }
      ]);
      //assert
      expect(shoppingCart.subtotal).to.equal(95);
    });
  });
});

describe("add method should", () => {
  it("store the item in the shopping cart", () => {
    //arrange
    let shoppingCart = new ShoppingCart([
      {
        id: 1,
        quantity: 4,
        price: 50
      }
    ]);
    //act
    shoppingCart.add({
      id: 2,
      quantity: 2,
      price: 30
    });
    //assert
    expect(shoppingCart._items).to.be.an("array");
    expect(shoppingCart._items).to.deep.equal([
      {
        id: 1,
        quantity: 4,
        price: 50
      },
      {
        id: 2,
        quantity: 2,
        price: 30
      }
    ]);
  });

  it("return the item that was stored in the shopping cart", () => {
    let shoppingCart = new ShoppingCart([
      {
        id: 1,
        quantity: 4,
        price: 50
      }
    ]);

    let item = {
      id: 2,
      quantity: 2,
      price: 30
    };

    let addedItem = shoppingCart.add(item);
    expect(addedItem).to.equal(item);
  });
});
