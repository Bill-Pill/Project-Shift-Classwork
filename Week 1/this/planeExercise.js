var pumpFuel = function(plane) {
  plane.fuel += 1;
};

var airplane = {
  fuel: 0,

  fly: function() {
    if (this.fuel < 2) {
      return 'on the ground!';
    } else {
      return 'flying!';
    }
  }
};

console.log('The plane should not be able to fly (yet): ' + airplane.fly());

pumpFuel(airplane);
console.log('The plane should STILL not be able to fly: ' + airplane.fly());

pumpFuel(airplane);
console.log('Can it fly now? ' + airplane.fly());
console.log(airplane.fuel);