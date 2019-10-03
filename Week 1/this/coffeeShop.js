var coffeeShop = {
  beans: 40,
  drinkRequirements: {
    latte: 10,
    americano: 5,
    doubleShot: 15,
    frenchPress: 12
  },
  makeDrink: function (drinkType) {
    if (!this.drinkRequirements[drinkType]) {
      console.log("Sorry - we don't serve " + drinkType)
    }
    else if (this.beans >= this.drinkRequirements[drinkType]) {
      this.beans -= this.drinkRequirements[drinkType];
      console.log("Your " + drinkType + " is ready!")

    } else {
      console.log("sorry, not enough beans for " + drinkType)
    }
  },
  money: 250,
  buySupplies: function (beansPurchased) {
    const beanPrice = 20;
    this.money -= beansPurchased * beanPrice;
    this.beans += beansPurchased;
    console.log(this.money)
    console.log(this.beans);
  }
};

coffeeShop.makeDrink('latte');
coffeeShop.makeDrink('americano');
coffeeShop.makeDrink('pourOver');
coffeeShop.makeDrink('doubleShot');
coffeeShop.makeDrink('frenchPress');
coffeeShop.buySupplies(10);
coffeeShop.makeDrink('frenchPress');