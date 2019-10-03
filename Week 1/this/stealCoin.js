//Create a method called stealCoins that takes a number parameter and decreases the tipJar's coins by that amount:

var tipJar = {
  coinCount: 20,
  tip: function () {
    this.coinCount += 1;
  },
  stealCoins: function (num) {
    this.coinCount -= num;
  }
};

tipJar.tip();
console.log('Wishing well should have 21 coins: ' + tipJar.coinCount);

tipJar.stealCoins(3);
console.log('Wishing well should have 18 coins: ' + tipJar.coinCount);

tipJar.stealCoins(10);
console.log('Wishing well should have 8 coins: ' + tipJar.coinCount);